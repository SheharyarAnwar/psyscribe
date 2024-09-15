import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import Session from "@/models/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    if (!clientId) {
      return NextResponse.json(
        { message: "Client ID is required" },
        { status: 400 }
      );
    }

    const sessions = await Session.find({ "client._id": clientId });
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
