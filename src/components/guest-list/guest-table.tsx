"use client";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { mockGuests } from "@/src/lib/mock/guest-list-data";
import { cn } from "@/src/core/utils/cn";
import { ChevronLeft, ChevronRight, Download, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export function GuestTable() {
  const t = useTranslations("GuestList");

  const getGenderBadgeColor = (gender: string) => {
    return gender === "Female"
      ? "bg-pink-100 text-pink-700"
      : "bg-blue-100 text-blue-700";
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      "checked-in": {
        label: t("statusCheckedIn"),
        className: "bg-green-100 text-green-700",
      },
      confirmed: {
        label: t("statusConfirmed"),
        className: "bg-yellow-100 text-yellow-700",
      },
      invited: {
        label: t("statusInvited"),
        className: "bg-purple-100 text-purple-700",
      },
      "no-show": {
        label: t("statusNoShow"),
        className: "bg-red-100 text-red-700",
      },
      requested: {
        label: t("statusRequested"),
        className: "bg-gray-100 text-gray-700",
      },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap];
    return statusInfo || statusMap.invited;
  };

  const getPromoterAvatar = (type: string) => {
    const colorMap = {
      promoter: "bg-gray-900 text-white",
      vip: "bg-purple-600 text-white",
      general: "bg-gray-400 text-white",
      table: "bg-orange-500 text-white",
    };
    return colorMap[type as keyof typeof colorMap] || colorMap.general;
  };

  return (
    <Card className="bg-white border-border">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border">
        <div className="col-span-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("guestName")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("gender")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("ageGroup")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("promoter")}
        </div>
        <div className="col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("status")}
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Rows */}
      <div>
        {mockGuests.map((guest) => {
          const statusInfo = getStatusBadge(guest.status);
          return (
            <div
              key={guest.id}
              className="grid grid-cols-12 gap-4 items-center p-4 border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Guest Name */}
              <div className="col-span-3 flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-gray-200 text-gray-700">
                  <AvatarFallback className="font-bold text-sm">
                    {guest.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {guest.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{guest.email}</p>
                </div>
              </div>

              {/* Gender */}
              <div className="col-span-2">
                <Badge
                  className={cn(
                    "font-semibold px-2.5 py-1 rounded-md text-xs",
                    getGenderBadgeColor(guest.gender)
                  )}
                >
                  ♀ {guest.gender}
                </Badge>
              </div>

              {/* Age Group */}
              <div className="col-span-2">
                <p className="text-sm font-medium text-foreground">
                  {guest.ageGroup}
                </p>
              </div>

              {/* Promoter */}
              <div className="col-span-2 flex items-center gap-2">
                <Avatar
                  className={cn(
                    "h-8 w-8",
                    getPromoterAvatar(guest.promoter.type)
                  )}
                >
                  <AvatarFallback className="font-bold text-xs">
                    {guest.promoter.initials}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium text-foreground">
                  {guest.promoter.name}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <Badge
                  className={cn(
                    "font-bold px-3 py-1 rounded-md text-xs",
                    statusInfo.className
                  )}
                >
                  {statusInfo.label}
                </Badge>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {t("showing")} 1 {t("to")} 5 {t("of")} 1240 {t("entries")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white border-border gap-2">
            <Download className="h-4 w-4" />
            {t("export")}
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="h-9 w-9 bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold">
              1
            </Button>
            <Button
              variant="outline"
              className="h-9 w-9 bg-white border-border font-medium"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="h-9 w-9 bg-white border-border font-medium"
            >
              3
            </Button>
            <span className="px-2 text-sm text-muted-foreground">...</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-white border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
