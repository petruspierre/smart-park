import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function DashboardPages({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-center border-b p-4">
        <Link href="/app">
          <img
            className="h-6 object-contain"
            draggable={false}
            src="/smartPark.svg"
            alt="Logo do Smart Park"
          />
        </Link>
      </header>
      <main className="flex flex-1 w-full max-w-5xl mx-auto px-4">
        <div className="w-full mt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
