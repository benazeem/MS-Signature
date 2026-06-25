export interface AppUser {
  id?: string;
  email: string;
  type: "user";
  user_metadata: {
    full_name?: string;
  };
}

export interface AppSession {
  user: AppUser;
}

export interface AuthContextType {
  user: AppUser | null;
  session: AppSession | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface GuestAuthContextType {
  user: GuestUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface GuestUser {
  email: string;
  type: "guest";
}

export type LoginMode = "signin" | "link-sent";
