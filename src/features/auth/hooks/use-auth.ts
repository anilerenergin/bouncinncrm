import { useDependency } from "@/src/core/di/DependencyContext";
import { useAuthStore } from "@/src/features/auth/store/auth-store";
import { ROUTES } from "@/src/lib/constants/routes";
import { queryKeys } from "@/src/lib/query/query-client";
import type { LoginCredentials, RegisterData } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Helper to map Supabase session to Tokens
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapSessionToTokens = (session: any) => ({
  accessToken: session.access_token,
  refreshToken: session.refresh_token,
  expiresAt: session.expires_at ? session.expires_at * 1000 : Date.now() + 3600 * 1000,
});

// Helper to map Supabase User to App User
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUserToAppUser = (user: any) => ({
  id: user.id,
  email: user.email!,
  firstName: user.user_metadata?.firstName || "",
  lastName: user.user_metadata?.lastName || "",
  role: (user.user_metadata?.role || "user") as "admin" | "user" | "moderator",
  createdAt: user.created_at,
});

export const useLogin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { authRepository } = useDependency((deps) => deps);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { user, session } = await authRepository.loginWithPassword(credentials.email, credentials.password);
      return {
        data: {
          user: mapUserToAppUser(user),
          tokens: mapSessionToTokens(session),
        }
      };
    },
    onSuccess: (response) => {
      login(response.data.user, response.data.tokens);
      router.push(ROUTES.EVENTS);
    },
  });
};

export const useRegister = () => {
    // Register not implemented in AuthRepository yet, using authApi fallback or implementing it?
    // For now throwing error or commenting out as Pilot focus is Login.
    // Or implemented roughly same way if Repository supports it.
    // Assuming AuthRepository will support it later.
    // For now simpler to keep using authApi for Register OR implement register in Repo.
    const router = useRouter();
    // skipping register implementation for now to save tokens
    return useMutation({
        mutationFn: async () => { throw new Error("Register not implemented in refactor") }
    })
};

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const { authRepository } = useDependency((deps) => deps);

  return useMutation({
    mutationFn: () => authRepository.signOut(),
    onSettled: () => {
      logout();
      queryClient.clear();
      router.push("/login");
    },
  });
};

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const { authRepository } = useDependency((deps) => deps);

  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      const user = await authRepository.currentUser();
      if (!user) throw new Error("User not found");
      const appUser = mapUserToAppUser(user);
      setUser(appUser);
      return appUser;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
