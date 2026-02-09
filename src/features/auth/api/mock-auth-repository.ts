import { Session, User } from "@supabase/supabase-js";
import { AuthRepository } from "./auth-repository";

const MOCK_USER: User = {
  id: "mock-user-id",
  aud: "authenticated",
  role: "authenticated",
  email: "manager@bouncinn.com",
  email_confirmed_at: new Date().toISOString(),
  phone: "",
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: { 
    firstName: "Jane", 
    lastName: "Doe", 
    role: "admin" 
  },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const MOCK_SESSION: Session = {
  access_token: "mock-access-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "mock-refresh-token",
  user: MOCK_USER,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
};

export class MockAuthRepository implements AuthRepository {
  private user: User | null = null;

  async loginWithPassword(email: string, password: string): Promise<{ user: User; session: Session }> {
    console.log("Mock Login with Password:", email, password);
    this.user = MOCK_USER;
    return { user: MOCK_USER, session: MOCK_SESSION };
  }

  async loginWithEmail(email: string): Promise<void> {
    console.log("Mock Login with Email:", email);
    this.user = MOCK_USER;
  }

  async verifyOtp(email: string, token: string): Promise<{ session: Session | null; user: User | null; error: Error | null }> {
    console.log("Mock Verify OTP:", email, token);
    this.user = MOCK_USER;
    return { session: MOCK_SESSION, user: MOCK_USER, error: null };
  }

  async currentUser(): Promise<User | null> {
    return this.user || MOCK_USER; // Default to MOCK_USER for easier testing as requested
  }

  async signOut(): Promise<void> {
    this.user = null;
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
      // Trigger an initial sign in event
      setTimeout(() => callback("SIGNED_IN", MOCK_SESSION), 100);
      return { data: { subscription: { unsubscribe: () => {} } } };
  }
}
