import prisma from "@/lib/db";
import bcrypt from "bcrypt";

interface Login {
  email: string;
  password: string;
}

export const authService = {
  async login({ email, password }: Login) {
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
