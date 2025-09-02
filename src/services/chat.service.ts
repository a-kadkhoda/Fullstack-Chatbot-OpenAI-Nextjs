import prisma from "@/lib/db";
import { Conversation } from "@prisma/client";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatService = {
  async sendMessage(userId: number, prompt: string, conversationId?: string) {
    try {
      let conversation: Conversation;

      if (conversationId) {
        const existingConversation = await prisma.conversation.findFirst({
          where: {
            id: conversationId,
            userId: userId,
          },
        });

        if (!existingConversation)
          return { error: "Conversation not found", status: 404 };

        conversation = existingConversation;
      } else {
        conversation = await prisma.conversation.create({
          data: {
            userId: userId,
            title: prompt.slice(0, 40),
          },
        });
      }

      await prisma.message.create({
        data: {
          role: "USER",
          content: prompt,
          conversationId: conversation.id,
        },
      });

      const response = await client.responses.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        input: prompt,
        previous_response_id: conversation.lastMessageId,
      });

      await prisma.message.create({
        data: {
          role: "BOT",
          content: response.output_text,
          conversationId: conversation.id,
        },
      });
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { lastMessageId: response.id },
      });

      return {
        data: {
          conversationId: conversation.id,
          message: response.output_text,
        },
        status: 200,
      };
    } catch (error) {
      console.error("sendMessage error:", error);
      return { error: "Internal Server Error", status: 500 };
    }
  },
};
