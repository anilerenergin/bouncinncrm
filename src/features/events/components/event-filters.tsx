"use client";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/core/utils/cn";
import { Calendar as CalendarIcon, Search, X, Filter, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export type FilterTab = "all" | "upcoming" | "past";

interface EventFiltersProps {
    activeTab: FilterTab;
    onTabChange: (tab: FilterTab) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    startDate: Date | undefined;
    endDate: Date | undefined;
    onDateRangeChange: (
        startDate: Date | undefined,
        endDate: Date | undefined
    ) => void;
}

export function EventFilters({
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    startDate,
    endDate,
    onDateRangeChange,
}: EventFiltersProps) {
    const t = useTranslations("Events");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDateRange = () => {
        if (!startDate && !endDate) return t("selectDates");
        if (startDate && endDate) {
            return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        }
        if (startDate) return startDate.toLocaleDateString();
        return endDate?.toLocaleDateString();
    };

    return (
        <div className="space-y-8 w-full">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative w-full lg:flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder={t("searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-14 h-14 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-border focus:border-primary/50 rounded-2xl text-sm font-bold shadow-sm transition-all placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange("")}
                            className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground transition-all"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    )}
                </div>

                {/* Date Selector */}
                <div className="relative" ref={calendarRef}>
                    <Button
                        variant="outline"
                        className={cn(
                            "h-14 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-border text-foreground font-black text-[10px] uppercase tracking-widest gap-2 px-6 shadow-sm hover:bg-muted transition-all min-w-[240px] justify-between",
                            !startDate && !endDate && "text-muted-foreground"
                        )}
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            {formatDateRange()}
                        </div>
                        <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>

                    {isCalendarOpen && (
                        <div className="absolute top-16 right-0 z-50 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-none p-4 min-w-fit ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
                            <Calendar
                                mode="range"
                                selected={{
                                    from: startDate,
                                    to: endDate,
                                }}
                                onSelect={(range) => {
                                    if (range) {
                                        onDateRangeChange(range.from, range.to);
                                    } else {
                                        onDateRangeChange(undefined, undefined);
                                    }
                                    if (range?.from && range?.to) {
                                        setIsCalendarOpen(false);
                                    }
                                }}
                                initialFocus
                                numberOfMonths={2}
                                className="rounded-2xl"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border pb-2">
                <div className="flex gap-8 overflow-x-auto relative">
                    <TabButton
                        label={t("tabs.all")}
                        isActive={activeTab === "all"}
                        onClick={() => onTabChange("all")}
                    />
                    <TabButton
                        label={t("tabs.upcoming")}
                        isActive={activeTab === "upcoming"}
                        onClick={() => onTabChange("upcoming")}
                    />
                    <TabButton
                        label={t("tabs.past")}
                        isActive={activeTab === "past"}
                        onClick={() => onTabChange("past")}
                    />
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                    <Filter className="w-3.5 h-3.5" />
                    {t("sortNewest") || "SORT: NEWEST FIRST"}
                </div>
            </div>
        </div>
    );
}

function TabButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
                isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            {label}
        </button>
    );
}
