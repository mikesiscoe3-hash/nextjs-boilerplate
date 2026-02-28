import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const SINGLE_USER_ID = process.env.APP_USER_ID ?? '00000000-0000-0000-0000-000000000000'
