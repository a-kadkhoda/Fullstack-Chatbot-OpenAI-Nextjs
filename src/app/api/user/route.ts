import { userRegisterSchema } from "@/helper/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/services/user.service";
import { generateJwt } from "@/helper/token";
import { cookieOptions } from "@/helper/cookieConfig";

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

    if (!result.user || result.status !== 201)
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );

    const token = await generateJwt({ id: `${result.user.id}` });

    const res = NextResponse.json(
      { user: result.user },
      { status: result.status }
    );

    res.cookies.set({
      name: "token",
      value: token,
      ...cookieOptions,
    });

    return res;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
