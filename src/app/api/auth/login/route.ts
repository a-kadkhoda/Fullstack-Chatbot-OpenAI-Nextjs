import { userLoginSchema } from "@/helper/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { generateJwt } from "@/helper/token";
import { cookieOptions } from "@/helper/cookieConfig";

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
    if (!result.user || result.status !== 200) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    const token = await generateJwt(result.user);
    const res = NextResponse.json(
      { isLoggedIn: true, user: result.user },
      { status: result.status }
    );

    res.cookies.set({
      name: "token",
      value: token,
      ...cookieOptions,
    });

    return res;
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
