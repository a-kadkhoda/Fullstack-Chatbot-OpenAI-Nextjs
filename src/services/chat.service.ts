import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResposnse {
  id: string;
  meesage: string;
}

export const chatService = {
  async sendMessage(prompt: string): Promise<ChatResposnse> {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      input: prompt,
    });

    return {
      id: response.id,
      meesage: response.output_text,
    };
  },
};
