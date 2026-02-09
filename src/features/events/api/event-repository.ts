import { EventSchema, PaginatedEventsSchema } from "@/src/schemas";

export interface EventRepository {
  getEvents(params: GetEventsParams): Promise<PaginatedEventsSchema>;
  getEvent(eventId: string): Promise<EventSchema>;
}

export interface GetEventsParams {
  venueId: string;
  filter?: "all" | "upcoming" | "past";
  page?: number;
  pageSize?: number;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

export class SupabaseEventRepository implements EventRepository {
  private supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  private supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  async getEvents({
    venueId,
    filter = "all",
    page = 1,
    pageSize = 10,
    search,
    startDate,
    endDate,
  }: GetEventsParams): Promise<PaginatedEventsSchema> {
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
      `${this.supabaseUrl}/functions/v1/getAllEvents?${params}`,
      {
        headers: {
          "Authorization": `Bearer ${this.supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Failed to fetch events");
    }

    return await response.json();
  }

  async getEvent(eventId: string): Promise<EventSchema> {
    const params = new URLSearchParams({ eventId });

    const response = await fetch(
      `${this.supabaseUrl}/functions/v1/getEvent?${params}`,
      {
        headers: {
          "Authorization": `Bearer ${this.supabaseAnonKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Failed to fetch event");
    }

    return await response.json();
  }
}
