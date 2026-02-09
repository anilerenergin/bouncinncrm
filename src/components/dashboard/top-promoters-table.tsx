"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { mockTopPromoters } from "@/src/lib/mock/dashboard-data";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export function TopPromotersTable() {
  const t = useTranslations("Dashboard");

  const getAvatarColor = (initials: string) => {
    const colors = [
      "bg-orange-100 text-orange-700",
      "bg-pink-100 text-pink-700",
      "bg-blue-100 text-blue-700",
    ];
    return colors[initials.charCodeAt(0) % colors.length];
  };

  return (
    <Card className="p-5 bg-white border-border mb-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">
          {t("topPromoterPerformance")}
        </h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-3 px-2">
        <div className="col-span-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("promoter")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
          {t("invited")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
          {t("checkedIn")}
        </div>
        <div className="col-span-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("conversion")}
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {mockTopPromoters.map((promoter) => (
          <div
            key={promoter.id}
            className="grid grid-cols-12 gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {/* Promoter Info */}
            <div className="col-span-4 flex items-center gap-3">
              <Avatar className={`h-11 w-11 ${getAvatarColor(promoter.initials)}`}>
                <AvatarFallback className="font-bold text-base">
                  {promoter.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">
                  {promoter.name}
                </p>
                <p className="text-xs text-muted-foreground">{promoter.role}</p>
              </div>
            </div>

            {/* Invited */}
            <div className="col-span-2 text-center">
              <p className="text-base font-bold text-foreground">
                {promoter.invited}
              </p>
            </div>

            {/* Checked In */}
            <div className="col-span-2 text-center">
              <p className="text-base font-bold text-foreground">
                {promoter.checkedIn}
              </p>
            </div>

            {/* Conversion Rate */}
            <div className="col-span-4 flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#F2FD0A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${promoter.conversionRate}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-11 text-right">
                {promoter.conversionRate}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="ghost"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-gray-100"
        >
          {t("showAllPromoters")}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
