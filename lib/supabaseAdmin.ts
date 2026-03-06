import { createClient, SupabaseClient } from '@supabase/supabase-js'

let anonClient: SupabaseClient | null = null
let adminClient: SupabaseClient | null = null

function getSupabaseUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required')
  }
  return supabaseUrl
}

/**
 * Client for uploads / normal “user” calls.
 * Requires NEXT_PUBLIC_SUPABASE_ANON_KEY (the anon key).
 */
export function getSupabaseAnon() {
  if (anonClient) return anonClient

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!anonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is required')
  }

  anonClient = createClient(getSupabaseUrl(), anonKey)
  return anonClient
}

/**
 * Admin client (required for server-side admin tasks).
 * MUST be used only on the server.
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

function getSupabaseUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is required");
  return supabaseUrl;
}

export function getSupabaseAdmin() {
  if (adminClient) return adminClient;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
  }

  adminClient = createClient(getSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return adminClient;
}
export const SINGLE_USER_ID = process.env.SINGLE_USER_ID
