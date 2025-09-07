import prisma from "@/lib/db";

export const conversationService = {
  async getConversations(userId: number) {
    const existingConversations = await prisma.conversation.findMany({
      where: {
        userId,
      },
    });

    const info = existingConversations.map((conv) => {
      return { convId: conv.id, title: conv.title, conv };
    });

    return { data: info };
  },
};
