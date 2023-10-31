import { CalendarX } from "lucide-react";

export function ReservationNotFound() {
  return (
    <div className="bg-accent p-6 rounded-md flex flex-col gap-2 items-center">
      <CalendarX className="h-8 w-8" />
      <span className="font-bold">Nenhuma reserva encontrada</span>
    </div>
  )
}