"use client";

import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { PromoterHeader } from "@/src/features/promoters/components/PromoterHeader";
import { PromoterStats } from "@/src/features/promoters/components/PromoterStats";
import { PromoterList } from "@/src/features/promoters/components/PromoterList";
import { usePromoters } from "@/src/features/promoters/hooks/use-promoters";

export default function PromotersPage() {
  const { promoters, stats, isLoading } = usePromoters();

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">Promoters</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8 max-w-[1600px] mx-auto w-full">
          <PromoterHeader />
          <PromoterStats stats={stats} isLoading={isLoading} />
          <PromoterList promoters={promoters} isLoading={isLoading} />
        </div>
      </div>
    </SidebarInset>
  );
}
