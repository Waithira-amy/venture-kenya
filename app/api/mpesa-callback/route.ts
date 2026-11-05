import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Safaricom wraps the response inside Body.stkCallback
    const callbackData = data?.Body?.stkCallback;

    if (!callbackData) {
        return NextResponse.json({ success: false, error: "Invalid callback data" }, { status: 400 });
    }

    if (callbackData.ResultCode === 0) {
      // Payment was SUCCESSFUL
      const callbackMetadata = callbackData.CallbackMetadata.Item;
      
      // Extract the details Safaricom sends back
      const amount = callbackMetadata.find((item: any) => item.Name === "Amount")?.Value;
      const mpesaReceiptNumber = callbackMetadata.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value;
      const phoneNumber = callbackMetadata.find((item: any) => item.Name === "PhoneNumber")?.Value;

      // Log successful transaction
      console.log(`[VENTURE KENYA DONATION] Success! Receipt: ${mpesaReceiptNumber}, Amount: KES ${amount}, Phone: ${phoneNumber}`);
      
    } else {
      // Payment FAILED or was CANCELLED by the user
      console.log(`[VENTURE KENYA DONATION] Failed: ${callbackData.ResultDesc}`);
    }

    // You MUST return a successful response to Safaricom so they stop retrying
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing M-Pesa Callback:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}