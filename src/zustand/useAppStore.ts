import { create } from "zustand";

interface AppState {
  isPromptInputBotton: boolean;
  isResponsePending: boolean;

  setIsPromptInputBotton: (value: boolean) => void;
  setIsResponsePending: (value: boolean) => void;
}

const initialState = {
  isPromptInputBotton: false,
  isResponsePending: false,
};

export const useAppStore = create<AppState>()((set) => ({
  ...initialState,
  setIsPromptInputBotton: (value) =>
    set(() => ({ isPromptInputBotton: value })),
  setIsResponsePending: (value) => set(() => ({ isResponsePending: value })),
}));
