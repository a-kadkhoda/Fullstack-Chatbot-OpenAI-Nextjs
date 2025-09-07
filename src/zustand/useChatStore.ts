import { create } from "zustand";

interface ChatState {
  conversationId: string | null;

  setConversationId: (value: string) => void;
}

const initialState = {
  conversationId: null,
};

export const useChatStore = create<ChatState>()((set) => ({
  ...initialState,
  setConversationId: (value) => set(() => ({ conversationId: value })),
}));
