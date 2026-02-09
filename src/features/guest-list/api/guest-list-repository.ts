import { Guest, GuestListStats } from "../types/guest-list-types";

export interface IGuestListRepository {
  getGuests(): Promise<Guest[]>;
  getStats(): Promise<GuestListStats>;
}
