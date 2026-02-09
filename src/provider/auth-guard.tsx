"use client";

import {
  useIsAuthenticated,
  useIsHydrated,
} from "@/src/features/auth/store/auth-store";
import { AppLoadingState } from "@/src/core/components/AppLoadingState";
import { ROUTES } from "@/src/lib/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isHydrated = useIsHydrated();
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      fallback ?? (
        <AppLoadingState fullScreen message="Yükleniyor..." />
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export function GuestGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isHydrated = useIsHydrated();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push(ROUTES.EVENTS);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return (
      fallback ?? (
        <AppLoadingState fullScreen message="Yükleniyor..." />
      )
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
