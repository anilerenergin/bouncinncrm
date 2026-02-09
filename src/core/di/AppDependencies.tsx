"use client";

import React, { useMemo } from "react";
import { DependencyProvider } from "@/src/core/di/DependencyContext";
import { MockAuthRepository } from "@/src/features/auth/api/mock-auth-repository";
import { SupabaseEventRepository } from "@/src/features/events/api/event-repository";
import { MockDashboardRepository } from "@/src/features/dashboard/api/mock-dashboard-repository";
import { MockGuestListRepository } from "@/src/features/guest-list/api/mock-guest-list-repository";
import { MockPromoterRepository } from "@/src/features/promoters/api/mock-promoter-repository";

export function AppDependencies({ children }: { children: React.ReactNode }) {
    const dependencies = useMemo(() => {
        return {
            authRepository: new MockAuthRepository(),
            eventRepository: new SupabaseEventRepository(),
            dashboardRepository: new MockDashboardRepository(),
            guestListRepository: new MockGuestListRepository(),
            promoterRepository: new MockPromoterRepository(),
        };
    }, []);

    return (
        <DependencyProvider dependencies={dependencies}>
            {children}
        </DependencyProvider>
    );
}
