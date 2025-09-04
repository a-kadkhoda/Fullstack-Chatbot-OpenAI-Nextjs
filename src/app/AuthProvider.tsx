"use client";

import { User } from "@prisma/client";
import { useProfileStore } from "@/zustand/useProfileStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
  profile: Pick<User, "name" | "email" | "avatarUrl"> | null;
}

export function AuthProvider({ children, profile }: AuthProviderProps) {
  const { setAvatarUrl, setEmail, setName } = useProfileStore();

  useEffect(() => {
    setAvatarUrl(profile?.avatarUrl ?? "");
    setEmail(profile?.email ?? "");
    setName(profile?.name ?? "");
  }, [
    profile?.avatarUrl,
    profile?.email,
    profile?.name,
    setAvatarUrl,
    setEmail,
    setName,
  ]);

  return <>{children}</>;
}
