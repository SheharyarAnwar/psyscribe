import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import Session from "@/models/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { clientId, sessionDate, sessionDuration, sessionType, notes } =
      await req.json();

    if (!sessionType || !notes || !sessionType || !clientId) {
      return NextResponse.json(
        { message: "First name, last name, and userId are required" },
        { status: 400 }
      );
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    const session = await Session.create({
      client: client,
      sessionDate,
      sessionDuration,
      sessionType,
      notes,
    });

    return NextResponse.json(
      {
        message: "Client created successfully",
        session,
      },
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
