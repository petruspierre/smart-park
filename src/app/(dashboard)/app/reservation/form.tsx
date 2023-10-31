'use client'

import { ReservationCard } from "@/components/reservation-card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const parkingPlaces = [
  {
    label: 'Manaira Shopping',
    value: '1'
  }, {
    label: 'Mangabeira Shopping',
    value: '2'
  }
]

const formSchema = z.object({
  parkingPlace: z.string({
    required_error: "O local do estacionamento é obrigatório",
  }),
  reservationDate: z.date({
    required_error: "A data da reserva é obrigatória",
  }),
})

export function ReservationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="parkingPlace"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Estacionamento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? parkingPlaces.find(
                            (parking) => parking.value === field.value
                          )?.label
                        : "Selecionar estacionamento"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Procurar local..." />
                    <CommandEmpty>Nenhum estacionamento encontrado.</CommandEmpty>
                    <CommandGroup>
                      {parkingPlaces.map((parking) => (
                        <CommandItem
                          value={parking.label}
                          key={parking.value}
                          onSelect={() => {
                            form.setValue("parkingPlace", parking.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              parking.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {parking.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecione o estacionamento que deseja reservar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data da reserva</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", {
                          locale: ptBR
                        })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecione uma data para a reserva
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Fazer reserva</Button>
      </form>
    </Form>
  )
}