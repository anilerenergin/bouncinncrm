
"use client";

import { DashboardHeader } from "@/src/components/dashboard/dashboard-header";
import { GuestTrafficChart } from "@/src/features/dashboard/components/GuestTrafficChart";
import { MetricsGrid } from "@/src/features/dashboard/components/MetricsGrid";
import { RecentCheckinsList } from "@/src/features/dashboard/components/RecentCheckinsList";
import { DashboardStats } from "@/src/features/dashboard/components/DashboardStats";
import { TopPromotersTable } from "@/src/features/dashboard/components/TopPromotersTable";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";

export default function OverviewPage() {
  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">Dashboard Overview</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 pt-10 pb-12">
            <DashboardHeader />

            {/* Top Section: 4 Stats Cards in a Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <DashboardStats variant="invited" />
              <DashboardStats variant="checkins" />
              <DashboardStats variant="demographics" />
              <DashboardStats variant="conversion" />
            </div>

            {/* Main Layout: 2 Columns */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column (2/3 width) - Charts & Tables */}
              <div className="lg:col-span-2 space-y-6">
                <GuestTrafficChart />
                <TopPromotersTable />
              </div>

              {/* Right Column (1/3 width) - Metrics & Feed */}
              <div className="lg:col-span-1 space-y-4">
                <MetricsGrid />
                <RecentCheckinsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}

