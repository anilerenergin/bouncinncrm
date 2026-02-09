"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { mockFilterCounts } from "@/src/lib/mock/guest-list-data";
import { cn } from "@/src/core/utils/cn";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type FilterTab =
  | "all"
  | "invited"
  | "confirmed"
  | "checkedIn"
  | "noShow"
  | "requested";

export function GuestFilters() {
  const t = useTranslations("GuestList");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: t("allGuests"), count: mockFilterCounts.all },
    { key: "invited", label: t("invited"), count: mockFilterCounts.invited },
    {
      key: "confirmed",
      label: t("confirmed"),
      count: mockFilterCounts.confirmed,
    },
    {
      key: "checkedIn",
      label: t("checkedIn"),
      count: mockFilterCounts.checkedIn,
    },
    { key: "noShow", label: t("noShow"), count: mockFilterCounts.noShow },
    {
      key: "requested",
      label: t("requests"),
      count: mockFilterCounts.requested,
    },
  ];

  return (
    <div className="mb-8">
      {/* Search Bar Row */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[400px] h-12 rounded-full border-gray-300 bg-white px-6 shadow-sm focus-visible:ring-1 focus-visible:ring-gray-400 placeholder:text-gray-400"
        />
      </div>

      {/* Filter Tabs Row */}
      <div className="flex items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "h-10 px-5 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2",
              activeTab === tab.key
                ? "bg-[#1E1E1E] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            )}
          >
            {tab.label} 
            <span className={cn(
                "font-normal",
                activeTab === tab.key ? "text-gray-300" : "text-gray-400"
            )}>{tab.count}</span>
          </button>
        ))}
        
        <Button
          variant="outline"
          className="ml-auto bg-white border-gray-200 hover:bg-gray-50 gap-2 h-10 rounded-full px-5 text-gray-600 font-semibold"
        >
          <Filter className="h-4 w-4" />
          {t("filters")}
        </Button>
      </div>
    </div>
  );
}
