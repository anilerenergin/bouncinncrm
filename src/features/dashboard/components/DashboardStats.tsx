"use client";

import { Card } from "@/src/components/ui/card";
import { Users, CheckCircle, TrendingUp, UserCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useDashboard } from "@/src/features/dashboard/hooks/use-dashboard";
import { cn } from "@/src/core/utils/cn";

interface StatsCardsProps {
    variant: "invited" | "checkins" | "demographics" | "conversion";
}

export function DashboardStats({ variant }: StatsCardsProps) {
    const { stats, loading } = useDashboard();

    if (loading || !stats) {
        return (
            <Card className="border-none shadow-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="p-6 h-32 animate-pulse bg-muted/50 dark:bg-zinc-800/50 rounded-xl" />
            </Card>
        );
    }

    const configs = {
        invited: {
            title: "Total Invited",
            value: stats.totalInvitedGuests,
            icon: Users,
            description: "Active guest list requests",
            trend: "+12%",
            trendUp: true,
            gradient: "from-blue-500 to-indigo-600",
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        checkins: {
            title: "Total Check-ins",
            value: stats.totalCheckins,
            icon: CheckCircle,
            description: "Guests arrived tonight",
            trend: "+5%",
            trendUp: true,
            gradient: "from-emerald-500 to-teal-600",
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        demographics: {
            title: "Demographics",
            value: `${Math.round((stats.demographics.female / stats.demographics.total) * 100)}%`,
            subValue: "Female",
            icon: UserCheck,
            description: `${stats.demographics.total} Total Guests`,
            trend: stats.topAge,
            trendUp: true,
            trendLabel: "Avg Age",
            gradient: "from-violet-500 to-purple-600",
            bg: "bg-violet-50",
            text: "text-violet-600",
        },
        conversion: {
            title: "Conversion Rate",
            value: `${stats.conversionRate}%`,
            icon: TrendingUp,
            description: "Invited vs Checked-in",
            trend: `${stats.conversionChange > 0 ? "+" : ""}${stats.conversionChange}%`,
            trendUp: stats.conversionChange > 0,
            gradient: "from-rose-500 to-pink-600",
            bg: "bg-rose-50",
            text: "text-rose-600",
        },
    };

    const config = configs[variant];
    const Icon = config.icon;

    return (
        <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
            <div className={cn("absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity", config.text)}>
                <Icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
            </div>

            <div className="px-5 pt-2 pb-5 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className={cn("p-2 rounded-2xl shadow-sm", config.bg)}>
                        <Icon className={cn("w-5 h-5", config.text)} />
                    </div>
                    {config.trend && (
                        <div className={cn(
                            "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800",
                            config.trendUp
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                        )}>
                            {config.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {config.trend}
                            {/* @ts-ignore */}
                            {config.trendLabel && <span className="text-muted-foreground ml-1 font-normal">{config.trendLabel}</span>}
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{config.title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">
                            {config.value}
                        </h3>
                        {/* @ts-ignore */}
                        {config.subValue && <span className="text-sm font-medium text-muted-foreground">{config.subValue}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium truncate">
                        {config.description}
                    </p>
                </div>
            </div>

            <div className={cn("h-1 w-full absolute bottom-0 bg-gradient-to-r opacity-80", config.gradient)} />
        </Card>
    );
}
