"use client";

import { Card } from "@/src/components/ui/card";
import { mockDashboardStats } from "@/src/lib/mock/dashboard-data";
import { CalendarCheck, Mail, Percent, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface StatsCardsProps {
  variant: "invited" | "checkins" | "demographics" | "conversion";
}

export function StatsCards({ variant }: StatsCardsProps) {
  const t = useTranslations("Dashboard");
  const stats = mockDashboardStats;

  const demographicsData = [
    { name: "Female", value: stats.demographics.female, color: "#F2FD0A" },
    { name: "Male", value: stats.demographics.male, color: "#E0E0E0" },
  ];

  if (variant === "invited") {
    return (
      <Card className="p-4 bg-white border-border hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gray-50 rounded-xl">
            <Mail className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            {t("totalInvitedGuests")}
          </p>
        </div>
        <p className="text-4xl font-bold text-foreground tracking-tight">
          {stats.totalInvitedGuests.toLocaleString()}
        </p>
      </Card>
    );
  }

  if (variant === "checkins") {
    return (
      <Card className="p-4 bg-white border-border hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gray-50 rounded-xl">
            <CalendarCheck className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            {t("totalCheckins")}
          </p>
        </div>
        <p className="text-4xl font-bold text-foreground tracking-tight">
          {stats.totalCheckins.toLocaleString()}
        </p>
      </Card>
    );
  }

  if (variant === "demographics") {
    return (
      <Card className="p-4 bg-white border-border hover:shadow-md transition-shadow">
        <p className="text-sm text-muted-foreground font-semibold mb-3">
          {t("demographics")}
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F2FD0A]" />
              <span className="text-xs font-semibold text-foreground">
                {t("female")} {stats.demographics.female}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="text-xs font-semibold text-foreground">
                {t("male")} {stats.demographics.male}%
              </span>
            </div>
          </div>
          <div className="relative w-28 h-28 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={54}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground font-medium">{t("total")}</p>
                <p className="text-2xl font-bold text-foreground">{stats.demographics.total}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "conversion") {
    return (
      <Card className="p-4 bg-black text-white border-none rounded-2xl hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Percent className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <p className="text-sm text-white/70 font-semibold">{t("conversionRate")}</p>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded-full">
              <TrendingUp className="h-3 w-3 text-[#F2FD0A]" />
              <span className="text-[10px] font-bold text-[#F2FD0A]">
                +{stats.conversionChange}%
              </span>
            </div>
          </div>
        </div>
        <p className="text-5xl font-bold tracking-tight">{stats.conversionRate}%</p>
      </Card>
    );
  }

  return null;
}
