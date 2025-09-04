import { getUser } from "@/helper/fetchData/user";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import Sidebar from "@/features/sidebar/components/Sidebar";

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
    <section className="h-screen w-full flex ">
      <Sidebar />
      <AuthProvider profile={user}>
        <main className="size-full p-6">{children}</main>
      </AuthProvider>
    </section>
  );
}
