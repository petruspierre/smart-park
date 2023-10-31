import { ButtonCard } from "@/components/button-card";
import { Cable, CalendarPlus, UserCircle2 } from "lucide-react";
import { redirect } from 'next/navigation'

export default function AppHome() {
  return (
    <div>
      <h1>Home</h1>

      <section>
        <h3 className="font-bold mb-4 text-xl">Acesso rápido</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonCard
            icon={CalendarPlus}
            label="Nova reserva"
            href="/app/reservation"
          />
          <ButtonCard
            icon={Cable}
            label="Suporte"
            href="/app/support"
          />
          <ButtonCard
            icon={UserCircle2}
            label="Meus dados"
            href="/app/profile"
          />
        </div>
      </section>
    </div>
  )
}