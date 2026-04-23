import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowser() {
  if (!_browserClient) {
    _browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _browserClient;
}

export function getSupabaseAdmin() {
  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const supabaseAuth = {
  signOut: () => getSupabaseBrowser().auth.signOut(),

  getSession: () => getSupabaseBrowser().auth.getSession(),

  getUser: () => getSupabaseBrowser().auth.getUser(),
};
