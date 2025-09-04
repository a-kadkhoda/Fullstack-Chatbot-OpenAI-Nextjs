import prisma from "@/lib/db";
import { RegisterData } from "@/types/auth";
import bcrypt from "bcrypt";
import _ from "lodash";

export const userService = {
  async createUser({ email, name, password }: RegisterData) {
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
  async getMe(id: number) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!existingUser)
      return {
        error: "User not exist",
        status: 404,
      };
    return {
      user: _.pick(existingUser, ["name", "email", "avatarUrl"]),
      status: 200,
    };
  },
};
