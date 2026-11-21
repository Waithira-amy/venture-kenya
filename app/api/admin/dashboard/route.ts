import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: Request) {
  // Reading req.url ensures Next.js fetches fresh data on every request
  void new URL(req.url);

  try {
    const [votesRes, txRes, statsRes] = await Promise.all([
      pool.query<{ nominee_code: string; votes: number; updated_at: string }>(
        "SELECT nominee_code, votes, updated_at FROM nominee_votes"
      ),
      pool.query<{
        id: string;
        mpesa_receipt_number: string;
        checkout_request_id: string | null;
        nominee_code: string;
        phone_number: string;
        amount: number;
        votes_purchased: number;
        created_at: string;
      }>(
        `SELECT id, mpesa_receipt_number, checkout_request_id, nominee_code,
                phone_number, amount, votes_purchased, created_at
         FROM mpesa_transactions
         ORDER BY created_at DESC
         LIMIT 50`
      ),
      pool.query<{
        total_revenue: string;
        total_paid_votes: string;
        total_transactions: string;
      }>(
        `SELECT
           COALESCE(SUM(amount), 0) AS total_revenue,
           COALESCE(SUM(votes_purchased), 0) AS total_paid_votes,
           COUNT(*) AS total_transactions
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
        transactions: txRes.rows.map((tx) => ({
          ...tx,
          amount: Number(tx.amount),
          votes_purchased: Number(tx.votes_purchased),
        })),
        summary: {
          totalRevenue: Number(summary?.total_revenue ?? 0),
          totalPaidVotes: Number(summary?.total_paid_votes ?? 0),
          totalTransactions: Number(summary?.total_transactions ?? 0),
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