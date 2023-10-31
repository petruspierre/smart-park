import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Database } from "@/lib/database.types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { DoorOpen } from "lucide-react"
import { cookies } from "next/headers"

export default async function Profile() {
  const supabase = await createServerComponentClient<Database>({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <h1 className="font-bold text-2xl">Meus dados</h1>

      <section className="mt-4">
        <ul className="flex flex-col gap-2">
          <li className="flex justify-between">
            <span className="font-bold">
              Nome
            </span>
            <span>
              {user?.user_metadata.first_name}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">
              Sobrenome
            </span>
            <span>
              {user?.user_metadata.last_name}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold">
              E-mail
            </span>
            <span>
              {user?.email}
            </span>
          </li>
        </ul>
      </section>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground group mt-4 flex gap-4 items-center justify-between gap-3 rounded-md px-3 py-2 transition-all ease-in-out hover:shadow motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            <span className="font-normal">Sair</span>
            <DoorOpen className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action="/auth/api/logout" method="POST">
            <p className="mb-2 text-sm">
              Você será redirecionado para o login. Deseja continuar?
            </p>
            <div className="flex w-full justify-end gap-2">
              <Button type="submit" variant="destructive" size="sm">
                <span className="font-normal">Confirmar</span>
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  )
}