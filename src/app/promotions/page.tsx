"use client";

import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { PromotionsHeader } from "@/src/features/promotions/components/PromotionsHeader";
import { PromotionsFilters } from "@/src/features/promotions/components/PromotionsFilters";
import { PromotionCard } from "@/src/features/promotions/components/PromotionCard";
import { PromotionsMetrics } from "@/src/features/promotions/components/PromotionsMetrics";
import { useTranslations } from "next-intl";

export default function PromotionsPage() {
  const t = useTranslations("Promotions");

  const campaigns = [
    {
      status: "active" as const,
      title: t("vipBottleService"),
      description: "Save $200 on premium bottle combos. Includes private booth and express entry for groups of 6+.",
      date: "Jun 21, 2024",
      location: "Club 11",
      color: "#9333EA", // Purple
      imageText: "Nightclub crowd with purple lights"
    },
    {
      status: "scheduled" as const,
      title: "Early Bird Ticket Offer: 2 For 1",
      description: "Buy one ticket, get one free for the Neon Glow event. Offer valid for the first 100 purchases only.",
      date: "Jul 04, 2024",
      location: "The Rooftop",
      color: "#0F4C81", // Dark blue
      imageText: "Blue neon geometric shape glowing"
    },
    {
      status: "active" as const,
      isHot: true,
      title: "Birthday Bash Special: Free Entry + Drink",
      description: "Free entry + complimentary bottle of sparkling wine for groups of 6+ celebrating a birthday this month.",
      date: "Jun 22, 2024",
      location: "Underground Lounge",
      color: "#18181B", // Black
      imageText: "Champagne with sparklers"
    }
  ];

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">Promotions</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-20 space-y-12">
            {/* Header Section */}
            <PromotionsHeader />

            {/* Metrics Section */}
            <PromotionsMetrics />

            {/* Main Content */}
            <div className="space-y-10">
              <PromotionsFilters />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {campaigns.map((camp, idx) => (
                  <PromotionCard
                    key={idx}
                    status={camp.status}
                    isHot={camp.isHot}
                    title={camp.title}
                    description={camp.description}
                    date={camp.date}
                    location={camp.location}
                    color={camp.color}
                    imageText={camp.imageText}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
