import { userRegisterSchema } from "@/helper/validations/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/services/user.service";
import { generateJwt } from "@/helper/token";
import { cookieOptions } from "@/helper/cookieConfig";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    const result = await userService.getMe(Number(userId));

    if (result.status !== 200)
      return NextResponse.json(
        { isSuccess: false, error: result.error },
        { status: result.status }
      );

    return NextResponse.json(
      {
        isSuccess: true,
        user: result.user,
        message: `Welcome ${result.user?.name}`,
      },
      { status: result.status }
    );
  } catch (error) {
    console.error("Error get user:", error);
    return NextResponse.json(
      { isSuccess: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = userRegisterSchema.safeParse(body);
    if (!parseResult.success)
      return NextResponse.json(
        {
          isSuccess: false,
          error: parseResult.error.flatten(),
        },
        { status: 400 }
      );

    const result = await userService.createUser(parseResult.data);

    if (!result.user || result.status !== 201)
      return NextResponse.json(
        { isSuccess: false, error: result.error },
        { status: result.status }
      );

    const token = await generateJwt({ id: `${result.user.id}` });

    const res = NextResponse.json(
      {
        isSuccess: true,
        user: { name: result.user.name, email: result.user.email },
        message: "Created Successfully",
      },
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
      { isSuccess: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
