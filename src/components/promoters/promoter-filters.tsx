"use client";

import { useTranslations } from "next-intl";
import { Search, ListFilter } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export function PromoterFilters() {
  const t = useTranslations("Promoters");

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="relative w-full max-w-[500px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 font-bold" />
        <Input 
          className="w-full pl-12 pr-4 h-14 bg-white border-none rounded-3xl text-sm font-semibold text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:ring-0 focus-visible:bg-white" 
          placeholder={t("searchPlaceholder")}
        />
      </div>
      
      <Button variant="outline" className="h-10 rounded-full border border-gray-200 bg-white text-gray-500 font-bold text-xs gap-2 px-4 shadow-sm hover:bg-gray-50">
          <span className="text-gray-400 font-bold">SORT:</span>
          <span className="text-gray-900 font-extrabold">{t("sortTotalGuests")}</span>
          <ListFilter className="w-4 h-4 text-gray-400" />
      </Button>
    </div>
  );
}
