import { Promoter, PromoterStats } from "../types/promoter-types";

export interface IPromoterRepository {
  getPromoters(): Promise<Promoter[]>;
  getStats(): Promise<PromoterStats>;
}
