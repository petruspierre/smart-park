"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signupFormSchema = z.object({
  firstName: z
    .string({
      required_error: "O primeiro nome é obrigatório.",
    }),
  lastName: z
    .string({
      required_error: "O sobrenome é obrigatório.",
    }),
  cpf: z
    .string({
      required_error: "O CPF é obrigatório.",
    })
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
      message: "O CPF informado não é válido.",
    }),
  email: z
  .string({
    required_error: "O e-mail é obrigatório.",
  })
  .email({
    message: "O e-mail informado não é válido.",
  }),
  password: z
    .string({
      required_error: "A senha é obrigatória.",
    })
    .min(1, {
      message: "A senha é obrigatória.",
    }),
});
type SignUpFormSchemaType = z.infer<typeof signupFormSchema>;

export function SignUpForm() {
  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signupFormSchema as any),
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grix-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Thyago" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Maia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="XXX.XXX.XXX-XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="***" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center w-full pt-6">
          <Button className="w-full" type="submit">Cadastrar</Button>
        </div>
      </form>
    </Form>
  );
}
