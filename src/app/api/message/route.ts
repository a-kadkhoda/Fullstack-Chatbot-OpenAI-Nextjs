import { messageService } from "@/services/message.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const convId = searchParams.get("conv");
    if (!convId) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: "ConversationId not found",
        },
        { status: 400 }
      );
    }

    const result = await messageService.getMessages(convId);

    return NextResponse.json(
      { data: result.data, isSuccess: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
