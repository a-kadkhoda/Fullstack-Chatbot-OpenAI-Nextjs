import z from "zod";

export const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "prompt is required.")
    .max(1000, "prompt is too long (max 1000 characters)"),
  conversationId: z.string().uuid(),
});
