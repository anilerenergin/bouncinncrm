"use client";

import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { EventCard } from "@/src/features/events/components/event-card";
import { EventFilters, FilterTab } from "@/src/features/events/components/event-filters";
import { EventsHeader } from "@/src/features/events/components/EventsHeader";
import { EventsMetrics } from "@/src/features/events/components/EventsMetrics";
import dayjs from "dayjs";
import { cn } from "@/src/core/utils/cn";

export default function EventsPage() {
  const t = useTranslations("Events");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Mock data for immediate visual fidelity
  const mockEvents = useMemo(() => [
    {
      id: "1",
      title: "Neon Jungle: Electronic Night",
      start_date_time: dayjs().add(2, 'days').set('hour', 22).toISOString(),
      cover_image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
      capacity: 500,
      guest_count: 420,
      venue: { name: "Club 11" }
    },
    {
      id: "2",
      title: "Sunset Sessions: Deep House",
      start_date_time: dayjs().toISOString(),
      cover_image: "https://images.unsplash.com/photo-1541339907198-e08759dfc3f0?auto=format&fit=crop&w=800&q=80",
      capacity: 300,
      guest_count: 300,
      venue: { name: "The Rooftop" }
    },
    {
      id: "3",
      title: "Retro Velvet: 80s & 90s",
      start_date_time: dayjs().add(5, 'days').toISOString(),
      cover_image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      capacity: 400,
      guest_count: 210,
      venue: { name: "Underground Lounge" }
    },
    {
      id: "4",
      title: "Midnight Gala: Red Carpet",
      start_date_time: dayjs().subtract(2, 'days').toISOString(),
      cover_image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      capacity: 1000,
      guest_count: 980,
      venue: { name: "Grand Hall" }
    },
    {
      id: "5",
      title: "Industrial Echo: Techno Night",
      start_date_time: dayjs().add(1, 'week').toISOString(),
      cover_image: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&w=800&q=80",
      capacity: 600,
      guest_count: 150,
      venue: { name: "The Warehouse" }
    },
    {
      id: "6",
      title: "Acoustic Garden",
      start_date_time: dayjs().add(12, 'days').toISOString(),
      cover_image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80",
      capacity: 200,
      guest_count: 45,
      venue: { name: "Secret Garden" }
    }
  ], []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };

  const handleTabChange = (val: FilterTab) => {
    setActiveTab(val);
    setPage(1);
  };

  const handleDateRangeChange = (
    start: Date | undefined,
    end: Date | undefined
  ) => {
    setStartDate(start);
    setEndDate(end);
    setPage(1);
  };

  const totalPages = 3;

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); setPage(i); }}
            isActive={page === i}
            className={cn(
              "h-10 w-10 rounded-xl font-black text-[10px] uppercase tracking-widest border-none transition-all",
              page === i ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-white/50 hover:bg-white dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            )}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">Events</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-20 space-y-12">
            {/* Header Section */}
            <EventsHeader />

            {/* Metrics Section */}
            <EventsMetrics />

            {/* Main Content */}
            <div className="space-y-10">
              <EventFilters
                activeTab={activeTab}
                onTabChange={handleTabChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                startDate={startDate}
                endDate={endDate}
                onDateRangeChange={handleDateRangeChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {mockEvents.map((event) => (
                  <EventCard key={event.id} event={event as any} />
                ))}
              </div>

              <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  Showing <span className="text-foreground">6</span> of <span className="text-foreground">48</span> events
                </p>

                <Pagination className="w-auto mx-0">
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                        className={cn(
                          "h-10 w-10 p-0 rounded-xl bg-white/50 dark:bg-zinc-800/50 border-none hover:bg-white dark:hover:bg-zinc-800 transition-all",
                          page <= 1 && "pointer-events-none opacity-30"
                        )}
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
                        className={cn(
                          "h-10 w-10 p-0 rounded-xl bg-white/50 dark:bg-zinc-800/50 border-none hover:bg-white dark:hover:bg-zinc-800 transition-all",
                          page >= totalPages && "pointer-events-none opacity-30"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
