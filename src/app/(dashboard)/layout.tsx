import { getUser } from "@/helper/fetchData/user";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import SidebarWrapper from "@/features/sidebar/components/SidebarWrapper";

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
    <section className="h-screen w-screen flex overflow-hidden">
      <AuthProvider profile={user}>
        <SidebarWrapper>
          <main className="relative size-full  overflow-y-auto">
            {children}
          </main>
        </SidebarWrapper>
      </AuthProvider>
    </section>
  );
}
