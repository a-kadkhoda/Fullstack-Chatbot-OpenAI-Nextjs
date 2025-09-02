import z from "zod";

export const userRegisterSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8)
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Must contain at least one number",
    }),
});

export const userLoginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8)
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Must contain at least one number",
    }),
});
