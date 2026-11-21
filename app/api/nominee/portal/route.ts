import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { NOMINEES } from "@/data/nominees";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawCode = searchParams.get("code") || "";
  const cleanCode = rawCode.trim().replace(/^#/, "").toUpperCase();

  if (!cleanCode) {
    return NextResponse.json(
      { success: false, error: "Please enter your participant code." },
      { status: 400 }
    );
  }

  const nominee = NOMINEES.find((n) => n.code.toUpperCase() === cleanCode);

  if (!nominee) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Participant code not found. Please check your official code (e.g. VK-MA-061).",
      },
      { status: 404 }
    );
  }

  try {
    const [allVotesRes, votersRes] = await Promise.all([
      pool.query<{ nominee_code: string; votes: number }>(
        "SELECT nominee_code, votes FROM nominee_votes"
      ),
      pool.query<{
        id: string;
        mpesa_receipt_number: string;
        checkout_request_id: string | null;
        phone_number: string;
        amount: number;
        votes_purchased: number;
        created_at: string;
      }>(
        `SELECT id, mpesa_receipt_number, checkout_request_id, phone_number,
                amount, votes_purchased, created_at
         FROM mpesa_transactions
         WHERE UPPER(nominee_code) = $1
         ORDER BY created_at DESC`,
        [nominee.code.toUpperCase()]
      ),
    ]);

    const dbVoteMap: Record<string, number> = {};
    for (const row of allVotesRes.rows) {
      dbVoteMap[row.nominee_code.toUpperCase()] = Number(row.votes);
    }

    // Rank all nominees inside the logged-in nominee's category
    const categoryStandings = NOMINEES.filter(
      (n) => n.category === nominee.category
    )
      .map((n) => ({
        code: n.code,
        totalVotes: n.votes + (dbVoteMap[n.code.toUpperCase()] || 0),
      }))
      .sort((a, b) => b.totalVotes - a.totalVotes);

    const positionIndex = categoryStandings.findIndex(
      (item) => item.code.toUpperCase() === nominee.code.toUpperCase()
    );
    const position =
      positionIndex >= 0 ? positionIndex + 1 : categoryStandings.length;
    const totalInCategory = categoryStandings.length;
    const leaderVotes = categoryStandings[0]?.totalVotes ?? 0;

    const verifiedVotes = dbVoteMap[nominee.code.toUpperCase()] || 0;
    const totalVotes = nominee.votes + verifiedVotes;
    const votesBehindLeader = Math.max(0, leaderVotes - totalVotes);

    return NextResponse.json(
      {
        success: true,
        nominee: {
          id: nominee.id,
          code: nominee.code,
          name: nominee.name,
          category: nominee.category,
          categoryLabel: nominee.categoryLabel,
          image: nominee.image,
          baseVotes: nominee.votes,
          verifiedVotes,
          totalVotes,
        },
        standing: {
          position,
          totalInCategory,
          leaderVotes,
          votesBehindLeader,
        },
        voters: votersRes.rows.map((row) => ({
          id: row.id,
          receipt: row.mpesa_receipt_number,
          method:
            row.checkout_request_id === "PAYSTACK_CARD" ? "Card" : "M-Pesa",
          supporter: row.phone_number,
          votes: Number(row.votes_purchased),
          amount: Number(row.amount),
          createdAt: row.created_at,
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Nominee portal fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load nominee portal data." },
      { status: 500 }
    );
  }
}