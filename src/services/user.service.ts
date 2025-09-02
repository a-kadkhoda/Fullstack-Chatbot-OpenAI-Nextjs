import prisma from "@/lib/db";
import bcrypt from "bcrypt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const userService = {
  async createUser({ email, name, password }: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser)
      return {
        error: "User already registered.",
        status: 400,
      };

    const hashedPassword = await bcrypt.hash(password, 11);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      status: 201,
    };
  },
};
