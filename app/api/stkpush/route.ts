import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, amount, reference, description } = body;

    if (!phone || !amount) {
      return NextResponse.json({ success: false, error: "Phone and amount are required" }, { status: 400 });
    }

    // Format phone number to 254...
    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.slice(1);
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortcode = process.env.MPESA_SHORTCODE;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    if (!consumerKey || !consumerSecret || !passkey || !shortcode || !callbackUrl) {
       console.error("Missing M-Pesa environment variables");
       return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
    }

    // 1. Get Access Token (LIVE URL)
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const tokenRes = await fetch("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` },
      cache: 'no-store'
    });
    
    if (!tokenRes.ok) {
      throw new Error("Failed to get M-Pesa access token");
    }
    
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Prepare STK Push Password & Timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    // 3. Initiate STK Push (LIVE URL)
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline", // Updated for Till Numbers
      Amount: Math.ceil(amount),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: reference || "VentureKenya",
      TransactionDesc: description || "Donation to Venture Kenya",
    };

    const stkRes = await fetch("https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === "0") {
      return NextResponse.json({ success: true, data: stkData });
    } else {
      return NextResponse.json({ success: false, error: stkData.errorMessage || "STK Push failed" }, { status: 400 });
    }

  } catch (error: any) {
    console.error("STK Push Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}