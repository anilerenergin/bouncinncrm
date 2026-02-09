"use client";

import { useTranslations } from "next-intl";
import { Search, Calendar, MapPin, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/core/utils/cn";
import { useState } from "react";

const TABS = ["allPromotions", "active", "scheduled", "completed", "drafts"];

export function PromotionsFilters() {
    const t = useTranslations("Promotions");
    const [activeTab, setActiveTab] = useState("allPromotions");

    return (
        <div className="space-y-8 w-full">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative w-full lg:flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        className="w-full pl-14 h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-border focus:border-primary/50 rounded-2xl text-sm font-bold shadow-sm transition-all placeholder:text-muted-foreground"
                        placeholder={t("searchPlaceholder")}
                    />
                </div>

                <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                    <Button variant="outline" className="h-14 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-border text-foreground font-black text-[10px] uppercase tracking-widest gap-2 px-6 shadow-sm hover:bg-muted transition-all">
                        <Calendar className="w-4 h-4 text-primary" />
                        {t("dateRange")}
                        <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                    <Button variant="outline" className="h-14 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-border text-foreground font-black text-[10px] uppercase tracking-widest gap-2 px-6 shadow-sm hover:bg-muted transition-all">
                        <MapPin className="w-4 h-4 text-primary" />
                        {t("allVenues")}
                        <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                </div>
            </div>

            {/* Tabs Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border pb-2">
                <div className="flex gap-8 overflow-x-auto relative">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
                                activeTab === tab
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {t(tab)}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                    <Filter className="w-3.5 h-3.5" />
                    {t("sortNewest")}
                </div>
            </div>
        </div>
    );
}
