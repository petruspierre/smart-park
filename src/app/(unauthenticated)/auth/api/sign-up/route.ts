import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/lib/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const { email, password, firstName, lastName } = await request.json()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/api/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (response.error || !response.data.user) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}