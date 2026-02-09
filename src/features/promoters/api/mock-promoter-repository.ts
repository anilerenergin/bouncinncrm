import { IPromoterRepository } from "./promoter-repository";
import { Promoter, PromoterStats } from "../types/promoter-types";

export class MockPromoterRepository implements IPromoterRepository {
  private mockPromoters: Promoter[] = [
    {
      id: "1",
      name: "Sarah Miller",
      email: "sarah.m@nightclub.com",
      role: "Admin",
      initials: "SM",
      totalInvited: 1452,
      checkedIn: 980,
      status: "active",
      isVerified: true,
      conversionRate: 67,
    },
    {
      id: "2",
      name: "James Dean",
      email: "james.d@nightclub.com",
      role: "Promoter",
      initials: "JD",
      totalInvited: 856,
      checkedIn: 582,
      status: "active",
      isVerified: false,
      conversionRate: 68,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      email: "elena.r@nightclub.com",
      role: "Promoter",
      initials: "ER",
      totalInvited: 340,
      checkedIn: 153,
      status: "pending",
      isVerified: false,
      conversionRate: 45,
    },
  ];

  async getPromoters(): Promise<Promoter[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockPromoters;
  }

  async getStats(): Promise<PromoterStats> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalPromoters: 12,
      activePromoters: 8,
      pendingPromoters: 4,
      avgConversionRate: 62,
    };
  }
}
