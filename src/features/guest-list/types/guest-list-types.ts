export type GuestStatus = 'checked-in' | 'confirmed' | 'invited' | 'no-show' | 'requested';
export type Gender = 'Female' | 'Male';

export interface Promoter {
  id?: string;
  name: string;
  initials: string;
  type: 'promoter' | 'vip' | 'general' | 'table';
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  initials: string;
  gender: Gender;
  ageGroup: string;
  promoter: Promoter;
  status: GuestStatus;
  checkInTime?: string;
}

export interface GuestListStats {
  totalInvited: number;
  checkedIn: number;
  noShows: number;
  noShowRate: number;
  capacity: number;
}
