export interface DashboardStats {
  totalInvitedGuests: number;
  totalCheckins: number;
  conversionRate: number;
  conversionChange: number;
  demographics: {
    total: number;
    female: number;
    male: number;
  };
  topAge: string;
  firstTimers: number;
  repeatGuests: number;
  noShows: number;
}

export interface GuestTrafficData {
  day: string;
  checkins: number;
  label: string;
  isToday?: boolean;
}

export interface PromoterPerformance {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  initials: string;
  invited: number;
  checkedIn: number;
  conversionRate: number;
}

export interface RecentCheckin {
  id: string;
  guestName: string;
  guestInitials: string;
  gender: string;
  age: number;
  promoter: string;
  time: string;
  status: string;
}
