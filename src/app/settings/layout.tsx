"use client";

import { AppSidebar } from "@/src/components/common/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AuthGuard } from "@/src/provider/auth-guard";
import type { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full">{children}</main>
      </SidebarProvider>
    </AuthGuard>
  );
}
