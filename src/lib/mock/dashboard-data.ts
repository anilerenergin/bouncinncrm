/**
 * Mock data for dashboard demo
 * This file contains placeholder data for all dashboard components
 */

export const mockDashboardStats = {
    totalInvitedGuests: 1240,
    totalCheckins: 890,
    conversionRate: 71.7,
    conversionChange: 2.4,
    demographics: {
        total: 890,
        female: 454, // ~51%
        male: 436,   // ~49%
    },
    topAge: "21-25",
    firstTimers: 21,
    repeatGuests: 145,
    noShows: 10,
};

export const mockGuestTraffic = [
    { day: "S", checkins: 245, label: "Sunday" },
    { day: "M", checkins: 280, label: "Monday" },
    { day: "T", checkins: 310, label: "Tuesday" },
    { day: "W", checkins: 355, label: "Wednesday" },
    { day: "T", checkins: 390, label: "Thursday" },
    { day: "F", checkins: 425, label: "Friday" },
    { day: "S", checkins: 468, label: "Saturday", isToday: true },
];

export const mockTopPromoters = [
    {
        id: "1",
        name: "Alex Rivera",
        role: "VIP Host",
        avatar: null,
        initials: "A",
        invited: 150,
        checkedIn: 120,
        conversionRate: 80,
    },
    {
        id: "2",
        name: "Sarah Jenkins",
        role: "Promoter",
        avatar: null,
        initials: "S",
        invited: 210,
        checkedIn: 145,
        conversionRate: 69,
    },
    {
        id: "3",
        name: "Michael Chen",
        role: "Junior Promoter",
        avatar: null,
        initials: "M",
        invited: 95,
        checkedIn: 42,
        conversionRate: 44,
    },
];

export const mockRecentCheckins = [
    {
        id: "1",
        guestName: "Sarah Miller",
        guestInitials: "SM",
        gender: "F",
        age: 23,
        promoter: "Mike Ross",
        time: "11:42 PM",
        status: "Checked In",
    },
    {
        id: "2",
        guestName: "James Dean",
        guestInitials: "JD",
        gender: "M",
        age: 29,
        promoter: "VIP Host",
        time: "11:38 PM",
        status: "Checked In",
    },
    {
        id: "3",
        guestName: "Emily Moore",
        guestInitials: "EM",
        gender: "F",
        age: 26,
        promoter: "Mike Ross",
        time: "11:30 PM",
        status: "Checked In",
    },
    {
        id: "4",
        guestName: "John Williams",
        guestInitials: "JW",
        gender: "M",
        age: 31,
        promoter: "VIP Host",
        time: "11:25 PM",
        status: "Checked In",
    },
    {
        id: "5",
        guestName: "Alice Lee",
        guestInitials: "AL",
        gender: "F",
        age: 24,
        promoter: "Mike Ross",
        time: "11:20 PM",
        status: "Checked In",
    },
];
