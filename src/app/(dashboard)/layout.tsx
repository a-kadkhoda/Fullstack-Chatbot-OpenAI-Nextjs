import { getUser } from "@/lib/fetchData/user";
import React from "react";
import { AuthProvider } from "../AuthProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <main>
      <AuthProvider profile={user}>{children}</AuthProvider>
    </main>
  );
}
