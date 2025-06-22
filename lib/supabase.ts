import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use service role key on the server, anon key on the client
const supabaseKey =
  typeof window === "undefined" && supabaseServiceRoleKey
    ? supabaseServiceRoleKey
    : supabaseAnonKey;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}
if (!supabaseKey) {
  throw new Error("Missing Supabase key environment variable");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
