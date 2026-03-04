import { NextResponse } from 'next/server'
import { getSupabaseAdmin, SINGLE_USER_ID } from '../../../lib/supabaseAdmin'

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin()
  // now you can use supabaseAdmin below
  const { data, error } = await supabaseAdmin.from(...)
  ...
}
