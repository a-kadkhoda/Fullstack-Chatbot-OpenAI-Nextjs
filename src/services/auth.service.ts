import prisma from "@/lib/db";
import { LoginData } from "@/types/queries/auth";
import bcrypt from "bcrypt";

export const authService = {
  async login({ email, password }: LoginData) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return {
        error: "Invalid email or password.",
        status: 400,
      };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return {
        error: "Invalid email or password.",
        status: 400,
      };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      status: 200,
    };
  },
};
