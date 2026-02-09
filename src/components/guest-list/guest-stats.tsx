"use client";

import { mockGuestListStats } from "@/src/lib/mock/guest-list-data";
import { Grid, Mail, UserX } from "lucide-react";
import { useTranslations } from "next-intl";

export function GuestStats() {
  const t = useTranslations("GuestList");
  const stats = mockGuestListStats;

  return (
    <div className="flex items-start gap-24 mb-10">
      {/* Invited Guests */}
      <div className="flex flex-col"> {/* Wrapper for flow */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#FCFBC6] flex items-center justify-center">
            <Mail className="h-5 w-5 text-gray-700" />
          </div>
          {/* Capacity Badge in flex flow */}
           <div className="px-3 py-1 bg-[#EBEBEB] rounded-full whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-700">
              {t("capacity")}: 1,500
            </span>
          </div>
        </div>
        <div className="mt-2">
            <p className="text-sm text-gray-500 font-medium mb-1 pl-1">
            {t("invitedGuests")}
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight pl-1">
            {stats.totalInvited.toLocaleString()}
            </p>
        </div>
      </div>

      {/* Checked-in */}
      <div>
        <div className="w-12 h-12 rounded-full bg-[#FCFBC6] flex items-center justify-center mb-2">
          <Grid className="h-5 w-5 text-gray-700" />
        </div>
        <div className="mt-2">
            <p className="text-sm text-gray-500 font-medium mb-1 pl-1">
            {t("checkedIn")}
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight pl-1">
            {stats.checkedIn.toLocaleString()}
            </p>
        </div>
      </div>

      {/* No-shows */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-[#FCD8D8] flex items-center justify-center">
                <UserX className="h-5 w-5 text-red-700" />
            </div>
            {/* No rate badge */}
        </div>
        <div className="mt-2"> {/* Adjusted margin to match invited guests block */}
            <p className="text-sm text-gray-500 font-medium mb-1 pl-1">
            {t("noShows")}
            </p>
            <p className="text-4xl font-bold text-foreground tracking-tight pl-1">
            {stats.noShows}
            </p>
        </div>
      </div>
    </div>
  );
}
