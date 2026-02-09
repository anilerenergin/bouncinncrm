import { MockClient } from "@/src/core/api/mock-client";
import { DashboardRepository } from "./dashboard-repository";
import { DashboardStats, GuestTrafficData, PromoterPerformance, RecentCheckin } from "../types/dashboard-types";
import { mockDashboardStats, mockGuestTraffic, mockTopPromoters, mockRecentCheckins } from "@/src/lib/mock/dashboard-data";

export class MockDashboardRepository extends MockClient implements DashboardRepository {
  async getStats(): Promise<DashboardStats> {
    return this.success(mockDashboardStats);
  }

  async getGuestTraffic(): Promise<GuestTrafficData[]> {
    return this.success(mockGuestTraffic);
  }

  async getTopPromoters(): Promise<PromoterPerformance[]> {
    // Map mock data to match interface if needed, or ensure mock data matches
    return this.success(mockTopPromoters as unknown as PromoterPerformance[]);
  }

  async getRecentCheckins(): Promise<RecentCheckin[]> {
    return this.success(mockRecentCheckins as unknown as RecentCheckin[]);
  }
}
