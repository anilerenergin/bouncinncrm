"use client";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/core/utils/cn";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 w-full bg-white border-none shadow-sm rounded-md"
          />
        </div>

        {/* Date Range Selector */}
        <div className="relative" ref={calendarRef}>
          <div className="flex items-center">
            <Button
              variant="outline"
              className={cn(
                "bg-white border-none shadow-sm text-foreground justify-start w-full sm:w-[280px] h-10 font-normal hover:bg-white",
                !startDate && !endDate && "text-muted-foreground"
              )}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>

            {/* Clear Date Button */}
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onDateRangeChange(undefined, undefined);
                }}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </Button>
            )}
          </div>

          {isCalendarOpen && (
            <div className="absolute top-12 right-0 z-50 bg-white rounded-md shadow-lg border p-2 min-w-fit">
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
                captionLayout="dropdown"
                numberOfMonths={2}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      {!startDate && !endDate && (
        <div className="flex gap-2">
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
      )}
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
        "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
        isActive
          ? "bg-black text-white border-black"
          : "bg-white text-foreground border-white hover:bg-muted"
      )}
    >
      {label}
    </button>
  );
}
