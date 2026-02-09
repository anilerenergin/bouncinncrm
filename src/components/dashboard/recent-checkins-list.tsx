"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { mockRecentCheckins } from "@/src/lib/mock/dashboard-data";
import { useTranslations } from "next-intl";

export function RecentCheckinsList() {
  const t = useTranslations("Dashboard");

  const getAvatarColor = (initials: string) => {
    const colors = [
      "bg-gray-200 text-gray-700",
      "bg-gray-300 text-gray-800",
      "bg-gray-100 text-gray-600",
    ];
    return colors[initials.charCodeAt(0) % colors.length];
  };

  return (
    <Card className="p-5 bg-white border-border hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold text-foreground mb-4">
        {t("recentCheckins")}
      </h2>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-3 px-2">
        <div className="col-span-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("guest")}
        </div>
        <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("promoter")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("time")}
        </div>
        <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("status")}
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {mockRecentCheckins.map((checkin) => (
          <div
            key={checkin.id}
            className="grid grid-cols-12 gap-4 items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {/* Guest Info */}
            <div className="col-span-4 flex items-center gap-3">
              <Avatar
                className={`h-11 w-11 ${getAvatarColor(checkin.guestInitials)}`}
              >
                <AvatarFallback className="font-bold text-base">
                  {checkin.guestInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">
                  {checkin.guestName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {checkin.gender} / {checkin.age}
                </p>
              </div>
            </div>

            {/* Promoter */}
            <div className="col-span-3">
              <p className="text-sm font-medium text-foreground">{checkin.promoter}</p>
            </div>

            {/* Time */}
            <div className="col-span-2">
              <p className="text-sm font-medium text-foreground">{checkin.time}</p>
            </div>

            {/* Status */}
            <div className="col-span-3">
              <Badge
                className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A] font-bold px-3 py-1.5 rounded-full text-xs"
              >
                {checkin.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
