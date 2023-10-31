import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function UnauthenticatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log(session)

  if (session) {
    redirect('/app')
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-[minmax(auto,500px)_minmax(900px,_1fr)]">
      <div className="hidden invisible lg:block lg:visible lg:bg-gradient-to-t from-green-500 to-green-600"></div>

      <div className="p-12 w-full h-full flex flex-col items-center justify-center gap-12">
        <Link href="/">
          <img
            className='max-w-xs object-contain'
            draggable={false}
            src="/smartPark.svg"
            alt="Logo do Smart Park"
          />
        </Link>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </main>
  )
}