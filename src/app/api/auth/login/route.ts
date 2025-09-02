import { userLoginSchema } from "@/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parseResult = userLoginSchema.safeParse(body);
    if (!parseResult.success)
      return NextResponse.json(
        {
          error: parseResult.error.flatten(),
        },
        { status: 400 }
      );

    const result = await authService.login(parseResult.data);
    if (result.status !== 200) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { isLoggedIn: true, user: result.user },
      { status: result.status }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
