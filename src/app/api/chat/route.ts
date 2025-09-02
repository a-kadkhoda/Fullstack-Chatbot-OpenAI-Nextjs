import { chatSchema } from "@/helper/validations/chatValidations";
import { chatService } from "@/services/chat.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userID = request.headers.get("x-user-id");

  const body = await request.json();
  const parseResult = chatSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json({
      error: parseResult.error.flatten(),
      status: 400,
    });
  }
  const { prompt } = parseResult.data;

  try {
    const response = await chatService.sendMessage(prompt);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
