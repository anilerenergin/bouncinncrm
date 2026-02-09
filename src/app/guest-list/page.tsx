"use client";

import { GuestListHeader } from "@/src/features/guest-list/components/GuestListHeader";
import { GuestListStats } from "@/src/features/guest-list/components/GuestListStats";
import { GuestListTable } from "@/src/features/guest-list/components/GuestListTable";
import { useGuestList } from "@/src/features/guest-list/hooks/use-guest-list";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";

export default function GuestListPage() {
  const { guests, stats, isLoading } = useGuestList();

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">Guest List</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8 max-w-[1600px] mx-auto w-full">
          <GuestListHeader />
          <GuestListStats stats={stats} isLoading={isLoading} />
          <GuestListTable guests={guests} isLoading={isLoading} />
        </div>
      </div>
    </SidebarInset>
  );
}
