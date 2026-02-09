import { useState, useEffect } from "react";
import { useDependency } from "@/src/core/di/DependencyContext";
import { Promoter, PromoterStats } from "../types/promoter-types";

export function usePromoters() {
  const promoterRepository = useDependency((deps) => deps.promoterRepository);
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [stats, setStats] = useState<PromoterStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [promotersData, statsData] = await Promise.all([
          promoterRepository.getPromoters(),
          promoterRepository.getStats()
        ]);
        setPromoters(promotersData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load promoters data", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [promoterRepository]);

  return { promoters, stats, isLoading };
}
