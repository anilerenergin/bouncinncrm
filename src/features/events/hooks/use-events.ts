import { useDependency } from "@/src/core/di/DependencyContext";
import { GetEventsParams } from "@/src/features/events/api/event-repository";
import { EventSchema, PaginatedEventsSchema } from "@/src/schemas";
import { useQuery } from "@tanstack/react-query";

export function useEvents(params: GetEventsParams) {
  const { eventRepository } = useDependency((deps) => deps);

  return useQuery<PaginatedEventsSchema>({
    queryKey: ["events", params],
    queryFn: () => eventRepository.getEvents(params),
    enabled: !!params.venueId,
  });
}

export function useEvent(eventId: string) {
  const { eventRepository } = useDependency((deps) => deps);

  return useQuery<EventSchema>({
    queryKey: ["event", eventId],
    queryFn: () => eventRepository.getEvent(eventId),
    enabled: !!eventId,
  });
}
