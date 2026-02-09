"use client";

import { AppSidebar } from "@/src/components/common/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AuthGuard } from "@/src/provider/auth-guard";
import type { ReactNode } from "react";

export default function PromotersLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </AuthGuard>
  );
}
