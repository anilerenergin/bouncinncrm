import { IGuestListRepository } from "./guest-list-repository";
import { Guest, GuestListStats } from "../types/guest-list-types";
import { mockGuests, mockGuestListStats } from "@/src/lib/mock/guest-list-data";

export class MockGuestListRepository implements IGuestListRepository {
  async getGuests(): Promise<Guest[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockGuests as unknown as Guest[];
  }

  async getStats(): Promise<GuestListStats> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...mockGuestListStats,
      capacity: 1500 // Adding capacity as it's used in the UI
    };
  }
}
