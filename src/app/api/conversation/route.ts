import { conversationService } from "@/services/conversation.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    const result = await conversationService.getConversations(Number(userId));

    return NextResponse.json(
      { data: result.data, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Conversation API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
