/**
 * Mock data for guest list page
 */

export const mockEvents = [
    {
        id: "1",
        name: "Neon Jungle",
        date: "Saturday, Oct 14, 2023",
        capacity: 1500,
    },
    {
        id: "2",
        name: "Summer Vibes",
        date: "Friday, Oct 20, 2023",
        capacity: 2000,
    },
    {
        id: "3",
        name: "Halloween Special",
        date: "Tuesday, Oct 31, 2023",
        capacity: 1800,
    },
];

export const mockGuestListStats = {
    totalInvited: 1240,
    checkedIn: 890,
    noShows: 45,
    noShowRate: 2.4,
};

export const mockGuests = [
    {
        id: "1",
        name: "Sarah Miller",
        email: "sarah.m@example.com",
        initials: "SM",
        gender: "Female",
        ageGroup: "21-25",
        promoter: { name: "Mike Ross", initials: "MR", type: "promoter" },
        status: "checked-in",
    },
    {
        id: "2",
        name: "James Dean",
        email: "james.d@example.com",
        initials: "JD",
        gender: "Male",
        ageGroup: "26-30",
        promoter: { name: "VIP Host", initials: "VH", type: "vip" },
        status: "confirmed",
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        email: "elena.r@example.com",
        initials: "ER",
        gender: "Female",
        ageGroup: "21-25",
        promoter: { name: "General List", initials: "GL", type: "general" },
        status: "invited",
    },
    {
        id: "4",
        name: "Marcus Thorne",
        email: "marcus.t@example.com",
        initials: "MT",
        gender: "Male",
        ageGroup: "31-35",
        promoter: { name: "Table 4", initials: "T4", type: "table" },
        status: "no-show",
    },
    {
        id: "5",
        name: "Lisa Johnson",
        email: "lisa.j@example.com",
        initials: "LJ",
        gender: "Female",
        ageGroup: "18-21",
        promoter: { name: "Mike Ross", initials: "MR", type: "promoter" },
        status: "requested",
    },
    {
        id: "6",
        name: "David Chen",
        email: "david.c@example.com",
        initials: "DC",
        gender: "Male",
        ageGroup: "26-30",
        promoter: { name: "VIP Host", initials: "VH", type: "vip" },
        status: "checked-in",
    },
    {
        id: "7",
        name: "Emma Wilson",
        email: "emma.w@example.com",
        initials: "EW",
        gender: "Female",
        ageGroup: "21-25",
        promoter: { name: "Mike Ross", initials: "MR", type: "promoter" },
        status: "confirmed",
    },
    {
        id: "8",
        name: "Ryan Martinez",
        email: "ryan.m@example.com",
        initials: "RM",
        gender: "Male",
        ageGroup: "26-30",
        promoter: { name: "General List", initials: "GL", type: "general" },
        status: "invited",
    },
    {
        id: "9",
        name: "Sophia Anderson",
        email: "sophia.a@example.com",
        initials: "SA",
        gender: "Female",
        ageGroup: "21-25",
        promoter: { name: "VIP Host", initials: "VH", type: "vip" },
        status: "checked-in",
    },
    {
        id: "10",
        name: "Alex Turner",
        email: "alex.t@example.com",
        initials: "AT",
        gender: "Male",
        ageGroup: "31-35",
        promoter: { name: "Table 4", initials: "T4", type: "table" },
        status: "requested",
    },
];

export const mockFilterCounts = {
    all: 1240,
    invited: 350,
    confirmed: 120,
    checkedIn: 890,
    noShow: 45,
    requested: 45,
};
