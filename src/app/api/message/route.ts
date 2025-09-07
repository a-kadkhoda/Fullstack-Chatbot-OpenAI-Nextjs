import { messageSchema } from "@/helper/validations/messageValidations";
import { messageService } from "@/services/message.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = messageSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          error: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { conversationId } = parseResult.data;

    const result = await messageService.getMessages(conversationId);

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
