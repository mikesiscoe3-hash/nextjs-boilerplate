 import { NextResponse } from 'next/server'
-import { supabaseAdmin, SINGLE_USER_ID } from '../../../lib/supabaseAdmin'
+import { getSupabaseAdmin } from '../../../lib/supabaseAdmin'

 export async function GET() {
-  const { data, error } = await supabaseAdmin
+  const supabaseAdmin = getSupabaseAdmin()
+  // keep your existing query below; just make sure it starts from supabaseAdmin
+  // example:
+  // const { data, error } = await supabaseAdmin.from('projects').select('*')
 
   // ...rest of your handler
 }
