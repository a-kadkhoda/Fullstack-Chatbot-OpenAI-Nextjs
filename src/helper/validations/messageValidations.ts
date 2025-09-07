import z from "zod";

export const messageSchema = z.object({
  conversationId: z.string().uuid(),
});
