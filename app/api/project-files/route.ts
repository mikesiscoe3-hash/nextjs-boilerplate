import { NextResponse } from 'next/server'
import { supabaseAdmin, SINGLE_USER_ID } from '@/lib/supabaseAdmin'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) return NextResponse.json({ files: [] })

  const { data, error } = await supabaseAdmin
    .from('project_files')
    .select('*')
    .eq('user_id', SINGLE_USER_ID)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ files: data })
}
