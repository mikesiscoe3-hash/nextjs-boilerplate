import { NextResponse } from 'next/server'
import { supabaseAdmin, SINGLE_USER_ID } from '../../../lib/supabaseAdmin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('user_id', SINGLE_USER_ID)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ projects: data })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, focus_area } = body ?? {}

  if (!title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert([{ user_id: SINGLE_USER_ID, title, description, focus_area }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ project: data })
}
