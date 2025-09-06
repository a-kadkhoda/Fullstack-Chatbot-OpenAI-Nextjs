import { chatSchema } from "@/helper/validations/chatValidations";
import { chatService } from "@/services/chat.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    const body = await request.json();
    const parseResult = chatSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }
    const { prompt, conversationId } = parseResult.data;

    const result = await chatService.sendMessage(
      Number(userId),
      prompt,
      conversationId
    );

    if (result.status !== 200)
      return NextResponse.json(
        {
          isSuccess: false,
          error: result.error,
        },
        { status: result.status }
      );

    return NextResponse.json(
      { isSuccess: true, data: result.data },
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
