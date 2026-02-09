export type PromoterStatus = 'active' | 'pending' | 'inactive';

export interface Promoter {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
  totalInvited: number;
  checkedIn: number;
  status: PromoterStatus;
  isVerified: boolean;
  joinDate?: string;
  conversionRate?: number;
}

export interface PromoterStats {
  totalPromoters: number;
  activePromoters: number;
  pendingPromoters: number;
  avgConversionRate: number;
}
