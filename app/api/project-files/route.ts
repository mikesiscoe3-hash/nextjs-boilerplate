import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"; // adjust path

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("your_table")          // <-- pick your table / query
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
