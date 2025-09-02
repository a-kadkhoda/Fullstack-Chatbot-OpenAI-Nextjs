export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none" as const,
  path: "/",
  maxAge: 60 * 60, // 1 ساعت
};
