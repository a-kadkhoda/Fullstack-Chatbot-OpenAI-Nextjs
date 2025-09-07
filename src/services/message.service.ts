import prisma from "@/lib/db";

export const messageService = {
  async getMessages(conversationId: string) {
    const existingMessages = await prisma.message.findMany({
      where: {
        conversationId,
      },
    });

    const info = existingMessages.map((msg) => {
      return { id: msg.id, msg: msg.content, role: msg.role };
    });

    return { data: info };
  },
};
