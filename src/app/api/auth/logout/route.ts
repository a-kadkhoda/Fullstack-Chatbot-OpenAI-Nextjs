import { cookieOptions } from "@/helper/cookieConfig";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const response = NextResponse.json(
      {
        isSuccess: true,
        message: "Logout successful",
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: "",
      ...cookieOptions,
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Error logging out user:", error);
    return NextResponse.json(
      { isSuccess: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
