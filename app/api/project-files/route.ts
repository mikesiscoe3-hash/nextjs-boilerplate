import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin'

export async function GET() {
const supabaseAdmin = getSupabaseAdmin()
const { data, error } = await supabaseAdmin
}
