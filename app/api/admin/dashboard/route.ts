import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  void new URL(req.url);

  try {
    const [votesRes, statsRes] = await Promise.all([
      pool.query<{ nominee_code: string; votes: number; updated_at: string }>(
        "SELECT nominee_code, votes, updated_at FROM nominee_votes"
      ),
      pool.query<{
        total_revenue: string;
        total_paid_votes: string;
      }>(
        `SELECT
           COALESCE(SUM(amount), 0) AS total_revenue,
           COALESCE(SUM(votes_purchased), 0) AS total_paid_votes
         FROM mpesa_transactions`
      ),
    ]);

    const voteMap: Record<string, { votes: number; updatedAt: string }> = {};
    for (const row of votesRes.rows) {
      voteMap[row.nominee_code] = {
        votes: Number(row.votes),
        updatedAt: row.updated_at,
      };
    }

    const summary = statsRes.rows[0];

    return NextResponse.json(
      {
        success: true,
        voteMap,
        summary: {
          totalRevenue: Number(summary?.total_revenue ?? 0),
          totalPaidVotes: Number(summary?.total_paid_votes ?? 0),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}