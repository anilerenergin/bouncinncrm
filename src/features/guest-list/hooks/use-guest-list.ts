import { useState, useEffect } from "react";
import { useDependency } from "@/src/core/di/DependencyContext";
import { Guest, GuestListStats } from "../types/guest-list-types";

export function useGuestList() {
  const guestListRepository = useDependency((deps) => deps.guestListRepository);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState<GuestListStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [guestsData, statsData] = await Promise.all([
          guestListRepository.getGuests(),
          guestListRepository.getStats()
        ]);
        setGuests(guestsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load guest list data", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [guestListRepository]);

  return { guests, stats, isLoading };
}
