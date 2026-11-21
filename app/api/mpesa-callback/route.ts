import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nomineeCode = searchParams.get("nomineeCode") || "GENERAL";

    const data = await req.json();

    // Safaricom wraps the response inside Body.stkCallback
    const callbackData = data?.Body?.stkCallback;

    if (!callbackData) {
      return NextResponse.json(
        { success: false, error: "Invalid callback data" },
        { status: 400 }
      );
    }

    if (callbackData.ResultCode === 0) {
      // Payment was SUCCESSFUL
      const callbackMetadata = callbackData.CallbackMetadata?.Item ?? [];

      const amount = Number(
        callbackMetadata.find((item: any) => item.Name === "Amount")?.Value ?? 0
      );
      const mpesaReceiptNumber = String(
        callbackMetadata.find((item: any) => item.Name === "MpesaReceiptNumber")
          ?.Value ?? ""
      );
      const phoneNumber = String(
        callbackMetadata.find((item: any) => item.Name === "PhoneNumber")
          ?.Value ?? ""
      );
      const checkoutRequestId = String(callbackData.CheckoutRequestID ?? "");

      // Strictly 1 vote per KSh 10 verified by Safaricom
      const votesPurchased = Math.floor(amount / 10);

      console.log(
        `[VENTURE KENYA] Success! Nominee: ${nomineeCode}, Receipt: ${mpesaReceiptNumber}, Amount: KES ${amount}, Votes: ${votesPurchased}, Phone: ${phoneNumber}`
      );

      if (mpesaReceiptNumber && votesPurchased > 0) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");

          // 1. Log transaction (ON CONFLICT ignores duplicate retries from Safaricom)
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
              mpesaReceiptNumber,
              checkoutRequestId || null,
              nomineeCode,
              phoneNumber,
              amount,
              votesPurchased,
            ]
          );

          // 2. Increment nominee's live vote total only if this receipt is brand new
          if (insertTx.rowCount && insertTx.rowCount > 0) {
            await client.query(
              `INSERT INTO nominee_votes (nominee_code, votes, updated_at)
               VALUES ($1, $2, NOW())
               ON CONFLICT (nominee_code)
               DO UPDATE SET
                 votes = nominee_votes.votes + EXCLUDED.votes,
                 updated_at = NOW()`,
              [nomineeCode, votesPurchased]
            );
          }

          await client.query("COMMIT");
        } catch (dbError) {
          await client.query("ROLLBACK");
          console.error("Database error saving M-Pesa vote:", dbError);
        } finally {
          client.release();
        }
      }
    } else {
      // Payment FAILED or was CANCELLED by the user
      console.log(`[VENTURE KENYA] Failed: ${callbackData.ResultDesc}`);
    }

    // Always return 200 OK to Safaricom so they stop retrying
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing M-Pesa Callback:", error);
    return NextResponse.json({ success: true });
  }
}