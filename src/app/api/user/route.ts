import { userRegisterSchema } from "@/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = userRegisterSchema.safeParse(body);
    if (!parseResult.success)
      return NextResponse.json(
        {
          error: parseResult.error.flatten(),
        },
        { status: 400 }
      );

    const result = await userService.createUser(parseResult.data);

    if (result.status !== 201)
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );

    return NextResponse.json({ user: result.user }, { status: result.status });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
