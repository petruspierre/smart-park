import { Database } from "@/lib/database.types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Profile() {
  const supabase = await createServerComponentClient<Database>({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <h1 className="font-bold text-2xl">Meus dados</h1>

      <section>
        <ul>
          <li>
            <span>
              Nome
            </span>
            <span>
              {user?.user_metadata.first_name}
            </span>
          </li>
          <li>
            <span>
              Sobrenome
            </span>
            <span>
              {user?.user_metadata.last_name}
            </span>
          </li>
          <li>
            <span>
              E-mail
            </span>
            <span>
              {user?.email}
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}