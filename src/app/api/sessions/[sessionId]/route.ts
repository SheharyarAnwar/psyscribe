import { connectMongoDB } from "@/lib/mongodb";
import Session from "@/models/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = params.sessionId;
  try {
    await connectMongoDB();
    const session = await Session.findById(sessionId);

    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Session details fetched", session });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { message: "An error occurred while getting session" },
      { status: 500 }
    );
  }
}
