import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (response.error) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
