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
 * Admin client (optional).
 * Uses SUPABASE_SERVICE_ROLE_KEY if it exists, otherwise returns null.
 * (This is so missing service key doesn’t crash the build.)
 */
export function getSupabaseAdmin() {
  if (adminClient) return adminClient

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) return null

  adminClient = createClient(getSupabaseUrl(), serviceKey)
  return adminClient
}
