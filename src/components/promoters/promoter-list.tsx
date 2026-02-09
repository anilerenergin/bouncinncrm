"use client";

import { PromoterCard } from "./promoter-card";

const MOCK_PROMOTERS = [
  {
    id: "1",
    name: "Sarah Miller",
    email: "sarah.m@nightclub.com",
    role: "Admin",
    initials: "SM",
    totalInvited: "1,452",
    checkedIn: "980",
    status: "active" as const,
    isVerified: true,
  },
  {
    id: "2",
    name: "James Dean",
    email: "james.d@nightclub.com",
    role: "Promoter",
    initials: "JD",
    totalInvited: "856",
    checkedIn: "582",
    status: "active" as const,
    isVerified: false,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena.r@nightclub.com",
    role: "Promoter",
    initials: "ER",
    totalInvited: "340",
    checkedIn: "153",
    status: "pending" as const,
    isVerified: false,
  },
];

export function PromoterList() {
  return (
    <div className="flex flex-col gap-4 w-full pb-20">
      {MOCK_PROMOTERS.map((promoter, index) => (
        <PromoterCard 
            key={promoter.id} 
            promoter={promoter} 
            defaultOpen={index === 0} // First one open by default
        />
      ))}
    </div>
  );
}
