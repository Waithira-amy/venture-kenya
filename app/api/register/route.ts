import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // We will uncomment this after setting up the database

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, age, phone, category } = body;

    // Basic Validation
    if (!fullName || !age || !phone || !category) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // TODO: Save to Neon Postgres Database via Prisma
    /*
    const newContestant = await prisma.contestant.create({
      data: {
        fullName,
        age: parseInt(age),
        phone,
        category,
      },
    });
    */

    // For now, just return a success response with the received data
    return NextResponse.json(
      { message: "Registration received successfully!", data: body },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}