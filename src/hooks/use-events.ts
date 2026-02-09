import type {
    EventSchema,
    PaginatedEventsSchema,
} from "@/src/schemas";
import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface UseEventsParams {
  venueId: string;
  filter?: "all" | "upcoming" | "past";
  page?: number;
  pageSize?: number;
  search?: string;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export function useEvents({
  venueId,
  filter = "all",
  page = 1,
  pageSize = 10,
  search,
  startDate,
  endDate,
}: UseEventsParams) {
  return useQuery<PaginatedEventsSchema>({
    queryKey: ["events", venueId, filter, page, pageSize, search, startDate, endDate],
    queryFn: async () => {
      const queryParams: Record<string, string> = {
        venueId,
        filter,
        page: page.toString(),
        pageSize: pageSize.toString(),
      };

      if (search) queryParams.search = search;
      if (startDate) {
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");
        queryParams.startDate = `${year}-${month}-${day}`;
      }
      if (endDate) {
        const year = endDate.getFullYear();
        const month = String(endDate.getMonth() + 1).padStart(2, "0");
        const day = String(endDate.getDate()).padStart(2, "0");
        queryParams.endDate = `${year}-${month}-${day}`;
      }

      const params = new URLSearchParams(queryParams);

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/getAllEvents?${params}`,
        {
          headers: {
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch events");
      }

      return await response.json();
    },
    enabled: !!venueId,
  });
}

/**
 * Hook to fetch a single event by ID
 */
export function useEvent(eventId: string) {
  return useQuery<EventSchema>({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const params = new URLSearchParams({ eventId });

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/getEvent?${params}`,
        {
          headers: {
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch event");
      }

      return await response.json();
    },
    enabled: !!eventId,
  });
}
