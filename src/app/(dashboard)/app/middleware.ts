import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data, error } = await supabase.auth.getSession()

  console.log(data,error)

  if (!data || error) {
    return NextResponse.redirect('/auth/login')
  }

  return res
}
