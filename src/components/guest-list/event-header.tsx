"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { mockEvents } from "@/src/lib/mock/guest-list-data";
import { Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export function EventHeader() {
  const t = useTranslations("GuestList");
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {/* Event Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-white border-border hover:bg-gray-50 h-11"
            >
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {selectedEvent.date}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {mockEvents.map((event) => (
              <DropdownMenuItem
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer"
              >
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Event Name */}
        <h1 className="text-2xl font-bold text-foreground">
          {selectedEvent.name}
        </h1>

      </div>

      <div className="flex items-center gap-3">
        <Link href="/guest-list/invite?mode=bulk">
          <Button
            className="bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90 font-semibold h-10 px-6 rounded-full"
          >
            {t("bulkInvitation")}
          </Button>
        </Link>
        <Link href="/guest-list/invite">
          <Button className="bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90 font-semibold h-10 px-6 rounded-full">
            {t("addGuest")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
