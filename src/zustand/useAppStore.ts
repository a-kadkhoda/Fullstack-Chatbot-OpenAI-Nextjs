import { MessagesItem } from "@/features/messageField/components/MessageField";
import { create } from "zustand";

interface AppState {
  messages: MessagesItem[];
  isBotPending: boolean;
  setMessage: (data: MessagesItem) => void;
  setMessages: (data: MessagesItem[]) => void;
  setIsBotPending: (value: boolean) => void;
}

const initialState = {
  messages: [],
  isBotPending: false,
};

export const useAppStore = create<AppState>()((set) => ({
  ...initialState,
  setMessage: (value) =>
    set((state) => ({ messages: [...state.messages, value] })),
  setMessages: (value) => set(() => ({ messages: value })),
  setIsBotPending: (value) => set(() => ({ isBotPending: value })),
}));
