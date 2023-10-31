import { ReservationForm } from "./form";

export default function NewReservation() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Nova reserva</h1>

      <section>
        <ReservationForm />
      </section>
    </div>
  )
}