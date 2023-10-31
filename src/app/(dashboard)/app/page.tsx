import { ButtonCard } from "@/components/button-card";
import { ReservationCard } from "@/components/reservation-card";
import { ReservationNotFound } from "@/components/reservation-not-found";
import { Cable, CalendarPlus, CalendarX, UserCircle2 } from "lucide-react";
import { redirect } from 'next/navigation'

export default function AppHome() {
  return (
    <div>
      <section className="mb-6">
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

      <section className="mb-4">
        <h3 className="font-bold mb-4 text-xl">Reservas ativas</h3>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <ReservationCard 
            imageUrl="https://th.bing.com/th/id/R.419987ce3863ddb9248545eda1764ded?rik=SGWK2434mbvhxA&riu=http%3a%2f%2fwww.clickpb.com.br%2fmedia%2ffiler_public_thumbnails%2ffiler_public%2f2f%2f5e%2f2f5eb01d-a2db-476d-ac2e-86232ddc9aff%2fmanaira_shopping.jpg__1200x630_q85_crop-smart_subsampling-2_upscale.jpg&ehk=unDbxr7bd4g92hikKKQDZfZSuAKNC%2bBD3wC4hvB3Lpo%3d&risl=&pid=ImgRaw&r=0"
            place="Manaira Shopping"
            rightText="Até 2h"
          />
          <ReservationCard 
            imageUrl="https://th.bing.com/th/id/R.419987ce3863ddb9248545eda1764ded?rik=SGWK2434mbvhxA&riu=http%3a%2f%2fwww.clickpb.com.br%2fmedia%2ffiler_public_thumbnails%2ffiler_public%2f2f%2f5e%2f2f5eb01d-a2db-476d-ac2e-86232ddc9aff%2fmanaira_shopping.jpg__1200x630_q85_crop-smart_subsampling-2_upscale.jpg&ehk=unDbxr7bd4g92hikKKQDZfZSuAKNC%2bBD3wC4hvB3Lpo%3d&risl=&pid=ImgRaw&r=0"
            place="Manaira Shopping"
            rightText="Até 2h"
          />
          <ReservationCard 
            imageUrl="https://th.bing.com/th/id/R.419987ce3863ddb9248545eda1764ded?rik=SGWK2434mbvhxA&riu=http%3a%2f%2fwww.clickpb.com.br%2fmedia%2ffiler_public_thumbnails%2ffiler_public%2f2f%2f5e%2f2f5eb01d-a2db-476d-ac2e-86232ddc9aff%2fmanaira_shopping.jpg__1200x630_q85_crop-smart_subsampling-2_upscale.jpg&ehk=unDbxr7bd4g92hikKKQDZfZSuAKNC%2bBD3wC4hvB3Lpo%3d&risl=&pid=ImgRaw&r=0"
            place="Manaira Shopping"
            rightText="Até 2h"
          />
        </div>
      </section>

      <section>
        <h3 className="font-bold mb-4 text-xl">Últimas reservas</h3>

        <ReservationNotFound />
      </section>
    </div>
  )
}