"use client";

import { useTranslations } from "next-intl";
import { Calendar, Users, Star, ArrowUpRight } from "lucide-react";
import { Card } from "@/src/components/ui/card";

export function EventsMetrics() {
    const t = useTranslations("Events");

    const metrics = [
        {
            title: t("totalEvents") || "Total Events",
            value: "48",
            change: "+12%",
            icon: Calendar,
            color: "from-blue-500 to-indigo-600"
        },
        {
            title: t("activeNow") || "Active Now",
            value: "3",
            change: "+2",
            icon: Star,
            color: "from-amber-400 to-orange-600"
        },
        {
            title: t("expectedAttendance") || "Expected Attendance",
            value: "3,200",
            change: "+15%",
            icon: Users,
            color: "from-rose-500 to-red-600"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {metrics.map((metric, index) => (
                <Card key={index} className="p-8 rounded-[32px] border-none shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-between group overflow-hidden relative">
                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20 group-hover:bg-primary transition-all duration-300" />

                    <div className="flex items-center gap-5">
                        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white shadow-lg shadow-black/5`}>
                            <metric.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{metric.title}</p>
                            <h3 className="text-3xl font-black text-foreground tracking-tight">{metric.value}</h3>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-green-500/10 text-green-500 dark:text-green-400 px-2 py-1 rounded-lg border border-green-500/20">
                            <ArrowUpRight className="w-3 h-3" />
                            <span className="text-[10px] font-black">{metric.change}</span>
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t("vsLastMonth") || "VS LAST MONTH"}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}
