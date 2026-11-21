import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET /api/votes -> Fetches all live nominee vote counts from Neon
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nomineeCode = searchParams.get("nomineeCode");

  try {
    const result = nomineeCode
      ? await pool.query<{ nominee_code: string; votes: number }>(
          "SELECT nominee_code, votes FROM nominee_votes WHERE nominee_code = $1",
          [nomineeCode]
        )
      : await pool.query<{ nominee_code: string; votes: number }>(
          "SELECT nominee_code, votes FROM nominee_votes"
        );

    const votes: Record<string, number> = {};
    for (const row of result.rows) {
      votes[row.nominee_code] = Number(row.votes);
    }

    return NextResponse.json(
      { success: true, votes },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching votes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load votes", votes: {} },
      { status: 500 }
    );
  }
}

// POST /api/votes -> Records verified Card (Paystack) payments in Neon
export async function POST(req: Request) {
  const client = await pool.connect();

  try {
    const body = await req.json();
    const { reference, nomineeCode, email, amount, votesPurchased } = body;

    if (!reference || !nomineeCode || !votesPurchased) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await client.query("BEGIN");

    const insertTx = await client.query(
      `INSERT INTO mpesa_transactions (
         mpesa_receipt_number,
         checkout_request_id,
         nominee_code,
         phone_number,
         amount,
         votes_purchased
       )
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (mpesa_receipt_number) DO NOTHING
       RETURNING id`,
      [
        String(reference),
        "PAYSTACK_CARD",
        String(nomineeCode),
        String(email || "card-supporter"),
        Number(amount || 0),
        Number(votesPurchased),
      ]
    );

    if (insertTx.rowCount && insertTx.rowCount > 0) {
      await client.query(
        `INSERT INTO nominee_votes (nominee_code, votes, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (nominee_code)
         DO UPDATE SET
           votes = nominee_votes.votes + EXCLUDED.votes,
           updated_at = NOW()`,
        [String(nomineeCode), Number(votesPurchased)]
      );
    }

    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error recording card vote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save vote" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}