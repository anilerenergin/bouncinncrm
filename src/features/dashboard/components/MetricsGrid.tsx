"use client";

import { Card } from "@/src/components/ui/card";
import { mockDashboardStats } from "@/src/lib/mock/dashboard-data";
import { Calendar, RefreshCw, UserCheck, UserX } from "lucide-react";
import { useTranslations } from "next-intl";

export function MetricsGrid() {
    const t = useTranslations("Dashboard");
    const stats = mockDashboardStats;

    const metrics = [
        {
            label: t("topAge"),
            value: stats.topAge,
            icon: Calendar,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            label: t("firstTimers"),
            value: stats.firstTimers,
            icon: UserCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        {
            label: t("repeatGuests"),
            value: stats.repeatGuests,
            icon: RefreshCw,
            color: "text-violet-500",
            bg: "bg-violet-500/10",
            border: "border-violet-500/20",
        },
        {
            label: t("noShows"),
            value: stats.noShows,
            icon: UserX,
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 content-start">
            {metrics.map((metric) => (
                <Card
                    key={metric.label}
                    className={`p-4 border-l-4 ${metric.border} hover:shadow-lg transition-all duration-300 group bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm`}
                >
                    <div className="flex flex-col h-full justify-between gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {metric.label}
                            </span>
                            <div className={`p-1.5 rounded-lg ${metric.bg} ${metric.color} ring-1 ring-inset ${metric.border}`}>
                                <metric.icon className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:scale-105 transition-transform duration-300 origin-left">
                                {metric.value}
                            </h3>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
