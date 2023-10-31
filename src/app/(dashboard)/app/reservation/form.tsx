'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Database } from "@/lib/database.types"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  parkingPlace: z.string({
    required_error: "O local do estacionamento é obrigatório",
  }),
  reservationDate: z.date({
    required_error: "A data da reserva é obrigatória",
  }),
})

interface ParkingPlace {
  id: string;
  name: string;
  image_url: string;
}

export function ReservationForm() {
  const [parkingPlaces, setParkingPlaces] = useState<ParkingPlace[]>([])
  const { toast } = useToast()
  const router = useRouter()

  const supabase = createClientComponentClient<Database>()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user?.id) {
      toast({
        title: 'Erro ao validar usuário',
        description: 'Ocorreu um erro ao adicionar o link. Usuário inválido.',
        variant: 'destructive'
      })

      return
    }

    const { error } = await supabase.from('reservation').insert([
      {
        parking_place: values.parkingPlace,
        reserved_by: user.id,
        reserved_date: values.reservationDate.toDateString()
      },
    ])

    if (error) {
      toast({
        title: 'Erro ao realizar reserva',
        description: 'Ocorreu um erro ao reservar o estacionamento.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Reserva realizada',
        description: 'A reserva foi realizada com sucesso.'
      })
      router.replace('/app')
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('parking')
        .select(
          `
            id,
            name,
            image_url
          `,
        )

      if (data) {
        setParkingPlaces(data as any)
      }
    }

    getData()
  }, [supabase])

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
                        "w-full max-w-[400px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? parkingPlaces.find(
                            (parking) => parking.id === field.value
                          )?.name
                        : "Selecionar"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full max-w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Procurar local..." />
                    <CommandEmpty>Nenhum estacionamento encontrado.</CommandEmpty>
                    <CommandGroup>
                      {parkingPlaces.map((parking) => (
                        <CommandItem
                          value={parking.id}
                          key={parking.id}
                          onSelect={() => {
                            form.setValue("parkingPlace", parking.id)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              parking.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {parking.name}
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
                        "w-full max-w-[400px] pl-3 text-left font-normal",
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
        <Button type="submit" disabled={form.formState.isSubmitting}>Fazer reserva</Button>
      </form>
    </Form>
  )
}