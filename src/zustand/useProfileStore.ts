import { create } from "zustand";

interface ProfileState {
  name: string;
  email: string;
  avatarUrl: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setAvatarUrl: (value: string) => void;
}

const initialState = {
  name: "",
  email: "",
  avatarUrl: "",
};

export const useProfileStore = create<ProfileState>()((set) => ({
  ...initialState,
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setAvatarUrl: (value) => set(() => ({ avatarUrl: value })),
}));
