"use client";

import React, { createContext, useContext } from "react";
import { DashboardRepository } from "@/src/features/dashboard/api/dashboard-repository";
import { IGuestListRepository } from "@/src/features/guest-list/api/guest-list-repository";
import { IPromoterRepository } from "@/src/features/promoters/api/promoter-repository";

// Define the shape of our dependency container
export interface Dependencies {
    dashboardRepository: DashboardRepository;
    guestListRepository: IGuestListRepository;
    promoterRepository: IPromoterRepository;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const DependencyContext = createContext<Dependencies | null>(null);

export function DependencyProvider({
    children,
    dependencies,
}: {
    children: React.ReactNode;
    dependencies: Dependencies;
}) {
    return (
        <DependencyContext.Provider value={dependencies}>
            {children}
        </DependencyContext.Provider>
    );
}

export function useDependency<T>(selector: (deps: Dependencies) => T): T {
    const deps = useContext(DependencyContext);
    if (!deps) {
        throw new Error("useDependency must be used within a DependencyProvider");
    }
    return selector(deps);
}
