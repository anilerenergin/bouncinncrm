import { DashboardStats, GuestTrafficData, PromoterPerformance, RecentCheckin } from "../types/dashboard-types";

export interface DashboardRepository {
  getStats(): Promise<DashboardStats>;
  getGuestTraffic(): Promise<GuestTrafficData[]>;
  getTopPromoters(): Promise<PromoterPerformance[]>;
  getRecentCheckins(): Promise<RecentCheckin[]>;
}
