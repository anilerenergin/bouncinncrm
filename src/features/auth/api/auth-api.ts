import { supabase } from "@/src/lib/supabase/client";
import type { LoginCredentials, RegisterData } from "@/src/types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    const user = data.user;
    const session = data.session;

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email!,
          firstName: user.user_metadata?.firstName || "",
          lastName: user.user_metadata?.lastName || "",
          role: (user.user_metadata?.role || "user") as "admin" | "user" | "moderator",
          createdAt: user.created_at,
        },
        tokens: {
          accessToken: session?.access_token || "",
          refreshToken: session?.refresh_token || "",
          expiresAt: session?.expires_at ? session.expires_at * 1000 : Date.now() + 3600 * 1000,
        },
      },
    };
  },

  register: async (data: RegisterData) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          role: "user",
        },
      },
    });

    if (error) throw error;

    const user = authData.user;
    const session = authData.session;

    return {
      success: true,
      data: {
        user: {
          id: user!.id,
          email: user!.email!,
          firstName: data.firstName,
          lastName: data.lastName,
          role: "user" as const,
          createdAt: user!.created_at,
        },
        tokens: {
          accessToken: session?.access_token || "",
          refreshToken: session?.refresh_token || "",
          expiresAt: session?.expires_at ? session.expires_at * 1000 : Date.now() + 3600 * 1000,
        },
      },
    };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  },

  refreshToken: async (refreshToken: string) => {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) throw error;

    return {
      accessToken: data.session?.access_token || "",
      refreshToken: data.session?.refresh_token || "",
      expiresAt: data.session?.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600 * 1000,
    };
  },

  getMe: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;
    if (!user) throw new Error("User not found");

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email!,
        firstName: user.user_metadata?.firstName || "",
        lastName: user.user_metadata?.lastName || "",
        role: (user.user_metadata?.role || "user") as "admin" | "user" | "moderator",
        createdAt: user.created_at,
      },
    };
  },
};
