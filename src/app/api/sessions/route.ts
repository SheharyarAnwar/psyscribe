import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import Session from "@/models/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const clientId = searchParams.get("clientId");
    if (!clientId) {
      return NextResponse.json(
        { message: "Client ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if the client is associated with the user
    const client = await Client.findOne({ _id: clientId, createdBy: userId });
    if (!client) {
      return NextResponse.json(
        { message: "Client not found or not associated with the user" },
        { status: 404 }
      );
    }
    const sessions = await Session.find({ clientId: clientId }).select("-__v");
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
