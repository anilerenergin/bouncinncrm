import type { EventSchema } from "@/src/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export interface CreateEventParams {
  venue_id: string;
  title: string;
  description?: string;
  capacity?: number;
  cover_image?: string;
  start_date_time: string;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation<EventSchema, Error, CreateEventParams>({
    mutationFn: async (vars) => {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/createEvent`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vars),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create event");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
