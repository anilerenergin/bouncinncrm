import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/src/lib/supabase/client";

export interface AuthRepository {
  loginWithPassword(email: string, password: string): Promise<{ user: User; session: Session }>;
  loginWithEmail(email: string): Promise<void>; // OTP login usually
  verifyOtp(email: string, token: string): Promise<{ session: Session | null; user: User | null; error: Error | null }>;
  currentUser(): Promise<User | null>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: (event: string, session: Session | null) => void): { data: { subscription: { unsubscribe: () => void } } };
}

export class SupabaseAuthRepository implements AuthRepository {
  private supabase = supabase;

  async loginWithPassword(email: string, password: string): Promise<{ user: User; session: Session }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (!data.user || !data.session) throw new Error("Login failed");
    return { user: data.user, session: data.session };
  }

  async loginWithEmail(email: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });
    if (error) throw error;
  }

  async verifyOtp(email: string, token: string): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
      const { data, error } = await this.supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
      })
      return { session: data.session, user: data.user, error }
  }

  async currentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
      return this.supabase.auth.onAuthStateChange(callback);
  }
}
