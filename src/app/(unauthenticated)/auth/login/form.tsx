"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
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
    .nonempty({
      message: "A senha é obrigatória.",
    }),
});
type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema as any),
  });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) {
    try {
      const response = await fetch("/auth/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Erro ao fazer login",
          description: "Ocorreu um erro ao fazer login, tente novamente.",
          variant: "destructive",
        });
        return;
      }

      router.refresh();
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro ao fazer login, tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
