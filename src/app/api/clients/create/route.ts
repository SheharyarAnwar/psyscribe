import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { firstName, lastName, userId } = await req.json();

    if (!firstName || !lastName || !userId) {
      return NextResponse.json(
        { message: "First name, last name, and userId are required" },
        { status: 400 }
      );
    }

    const newClient = await Client.create({
      firstName,
      lastName,
      createdBy: userId,
      sessions: [],
    });

    return NextResponse.json(
      { message: "Client created successfully", client: newClient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the client." },
      { status: 500 }
    );
  }
}
