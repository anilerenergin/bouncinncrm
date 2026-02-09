import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/core/utils/cn";
import type { EventSchema } from "@/src/schemas";
import dayjs from "dayjs";
import { MapPin, Ticket } from "lucide-react";

interface EventCardProps {
  event: EventSchema;
}

function getEventBadge(startDateTime: string): string | null {
  const now = dayjs();
  const eventDate = dayjs(startDateTime);

  // If event is today
  if (eventDate.isSame(now, "day")) {
    return "Today";
  }

  // If event is in the future (upcoming)
  if (eventDate.isAfter(now)) {
    return "Upcoming";
  }

  // Past events have no badge
  return null;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = dayjs(event.start_date_time);
  const day = eventDate.format("DD");
  const month = eventDate.format("MMM").toUpperCase();
  const badge = getEventBadge(event.start_date_time);
  const guestCount = event.guest_count || 0;
  const capacity = event.capacity || 0;

  return (
    <Card className="overflow-hidden border-none shadow-sm pb-0 gap-0">
      {/* Image / Header Section */}
      <div className="relative h-48 bg-black w-full flex items-center justify-center p-6 text-center overflow-hidden">
        {/* Cover Image */}
        {event.cover_image ? (
          <img
            src={event.cover_image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-white text-sm">No Image</span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-md p-1.5 min-w-[3rem] text-center flex flex-col items-center leading-none shadow-sm z-10">
          <span className="text-[10px] font-bold uppercase text-muted-foreground mb-0.5">
            {month}
          </span>
          <span className="text-lg font-bold text-black">{day}</span>
        </div>

        {/* Status Badge */}
        {badge && (
          <div
            className={cn(
              "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-10",
              badge === "Today" && "bg-[var(--brand-yellow)] text-black",
              badge === "Live Now" && "bg-green-500 text-white",
              badge === "Upcoming" && "bg-white text-black"
            )}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="pt-4 pb-2 px-4">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <div className="flex items-center text-muted-foreground text-sm mb-1.5">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.venue?.name || "Unknown Venue"}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <Ticket className="w-4 h-4 mr-2" />
          <span>
            {guestCount} / {capacity} Guests
          </span>
        </div>
      </CardContent>
      {/* Footer if needed, but spacing looks handled by Content */}
      <div className="h-4" />
    </Card>
  );
}
