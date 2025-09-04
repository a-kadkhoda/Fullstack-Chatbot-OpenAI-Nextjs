import { userService } from "@/services/user.service";
import { headers } from "next/headers";

export async function getUser() {
  const userId = (await headers()).get("x-user-id");
  if (!userId) return null;

  try {
    const result = await userService.getMe(Number(userId));
    return result.status === 200 ? result.user : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
