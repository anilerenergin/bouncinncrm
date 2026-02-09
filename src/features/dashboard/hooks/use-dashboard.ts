import { useDependency } from "@/src/core/di/DependencyContext";
import { useEffect, useState } from "react";
import { DashboardStats, GuestTrafficData, PromoterPerformance, RecentCheckin } from "../types/dashboard-types";

export function useDashboard() {
  const dashboardRepository = useDependency((deps) => deps.dashboardRepository);
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [guestTraffic, setGuestTraffic] = useState<GuestTrafficData[]>([]);
  const [topPromoters, setTopPromoters] = useState<PromoterPerformance[]>([]);
  const [recentCheckins, setRecentCheckins] = useState<RecentCheckin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsData, trafficData, promotersData, checkinsData] = await Promise.all([
          dashboardRepository.getStats(),
          dashboardRepository.getGuestTraffic(),
          dashboardRepository.getTopPromoters(),
          dashboardRepository.getRecentCheckins(),
        ]);

        if (mounted) {
          setStats(statsData);
          setGuestTraffic(trafficData);
          setTopPromoters(promotersData);
          setRecentCheckins(checkinsData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load dashboard data'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, [dashboardRepository]);

  return {
    stats,
    guestTraffic,
    topPromoters,
    recentCheckins,
    loading,
    error,
  };
}
