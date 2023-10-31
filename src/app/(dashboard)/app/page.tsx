import { ButtonCard } from "@/components/button-card";
import { ReservationCard } from "@/components/reservation-card";
import { ReservationNotFound } from "@/components/reservation-not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Cable, CalendarPlus, CalendarX, UserCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export default async function AppHome() {
  const supabase = await createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: activeReservations } = await supabase
    .from("reservation")
    .select(
      `
        id,
        reserved_date,
        parking (
          id,
          name,
          image_url
        )
      `
    )
    .eq("reserved_by", (user || {}).id || "")
    .gte("reserved_date", new Date().toISOString())
    .order("reserved_date", { ascending: true });
  const { data: lastReservations } = await supabase
    .from("reservation")
    .select(
      `
        id,
        reserved_date,
        parking (
          id,
          name,
          image_url
        )
      `
    )
    .eq("reserved_by", (user || {}).id || "")
    .lt("reserved_date", new Date().toISOString())
    .order("reserved_date", { ascending: true });

  const firstName = user?.user_metadata.first_name;

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Olá, {firstName}!</h1>

      <section className="mb-6">
        <h3 className="font-bold mb-4 text-xl">Acesso rápido</h3>
        <div className="flex flex-wrap gap-2">
          <ButtonCard
            icon={CalendarPlus}
            label="Nova reserva"
            href="/app/reservation"
          />
          <ButtonCard icon={Cable} label="Suporte" href="/app/support" />
          <ButtonCard
            icon={UserCircle2}
            label="Meus dados"
            href="/app/profile"
          />
        </div>
      </section>

      <section className="mb-4">
        <h3 className="font-bold mb-4 text-xl">Reservas ativas</h3>

        {activeReservations?.length === 0 ? (
          <ReservationNotFound />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {activeReservations?.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                imageUrl={reservation.parking?.image_url || ""}
                place={reservation.parking?.name || ""}
                rightText={new Date(
                  reservation.reserved_date || ""
                ).toLocaleDateString()}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-bold mb-4 text-xl">Últimas reservas</h3>

        {lastReservations?.length === 0 ? (
          <ReservationNotFound />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {lastReservations?.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                imageUrl={reservation.parking?.image_url || ""}
                place={reservation.parking?.name || ""}
                rightText={new Date(
                  reservation.reserved_date || ""
                ).toLocaleDateString()}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
