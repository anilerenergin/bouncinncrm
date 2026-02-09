import type { AuthTokens, User } from "@/src/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setHydrated: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isHydrated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      ...initialState,

      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),

      setTokens: (tokens) =>
        set((state) => {
          state.tokens = tokens;
          state.isAuthenticated = !!tokens;
        }),

      login: (user, tokens) =>
        set((state) => {
          state.user = user;
          state.tokens = tokens;
          state.isAuthenticated = true;
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.tokens = null;
          state.isAuthenticated = false;
        }),

      setHydrated: () =>
        set((state) => {
          state.isHydrated = true;
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Selector hooks - Memoization için
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsHydrated = () => useAuthStore((state) => state.isHydrated);
