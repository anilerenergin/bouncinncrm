"use client";

import { PromoterCard } from "./PromoterCard";
import { Promoter } from "../types/promoter-types";

interface PromoterListProps {
    promoters: Promoter[];
    isLoading: boolean;
}

export function PromoterList({ promoters, isLoading }: PromoterListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 rounded-[32px] bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {promoters.map((promoter, index) => (
                <PromoterCard
                    key={promoter.id}
                    promoter={promoter}
                    defaultOpen={index === 0}
                />
            ))}
        </div>
    );
}
