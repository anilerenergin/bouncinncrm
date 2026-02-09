"use client";

import { AppNetworkImage } from "@/src/core/components/AppNetworkImage";
import { cn } from "@/src/core/utils/cn";
import type { EventSchema } from "@/src/schemas";
import dayjs from "dayjs";
import { MapPin, Ticket, Calendar as CalendarIcon, CheckCircle2, ChevronRight } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

interface EventCardProps {
    event: EventSchema;
}

function getEventBadge(startDateTime: string): string | null {
    const now = dayjs();
    const eventDate = dayjs(startDateTime);

    if (eventDate.isSame(now, "day")) {
        return "Today";
    }

    if (eventDate.isAfter(now)) {
        return "Upcoming";
    }

    return "Past";
}

export function EventCard({ event }: EventCardProps) {
    const eventDate = dayjs(event.start_date_time);
    const day = eventDate.format("DD");
    const month = eventDate.format("MMM").toUpperCase();
    const badge = getEventBadge(event.start_date_time);
    const guestCount = event.guest_count || 0;
    const capacity = event.capacity || 0;
    const occupancy = capacity > 0 ? (guestCount / capacity) * 100 : 0;

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer">
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                <AppNetworkImage
                    src={event.cover_image || ""}
                    alt={event.title}
                    fill
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    containerClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Date Badge */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl p-2.5 min-w-[3.5rem] text-center flex flex-col items-center leading-none shadow-xl z-10 border border-white/20">
                    <span className="text-[10px] font-black uppercase text-primary mb-1 tracking-widest">
                        {month}
                    </span>
                    <span className="text-2xl font-black text-foreground">{day}</span>
                </div>

                {/* Status Badge */}
                {badge && (
                    <div className="absolute top-6 right-6 z-10">
                        <Badge
                            className={cn(
                                "rounded-xl px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] border-none shadow-lg",
                                badge === "Today" ? "bg-primary text-primary-foreground animate-pulse" :
                                    badge === "Upcoming" ? "bg-white/20 backdrop-blur-md text-white" :
                                        "bg-zinc-500/50 backdrop-blur-md text-white/70"
                            )}
                        >
                            {badge}
                        </Badge>
                    </div>
                )}

                {/* Progress Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${Math.min(occupancy, 100)}%` }}
                                />
                            </div>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">
                                {Math.round(occupancy)}% Booked
                            </span>
                        </div>
                        <CheckCircle2 className={cn("w-4 h-4", occupancy >= 100 ? "text-green-400" : "text-white/40")} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="line-clamp-1">{event.venue?.name || "Unknown Venue"}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-primary" />
                        <span>{guestCount} / {capacity}</span>
                    </div>
                </div>

                <h3 className="text-xl font-black text-foreground mb-4 leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                            {eventDate.format("dddd, HH:mm")}
                        </span>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
