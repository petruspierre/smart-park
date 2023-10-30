import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div>
        <h1 className="text-center font-bold text-2xl">Seja bem-vindo</h1>
        <h2 className="text-center">Escolha uma opção para acessar a plataforma</h2>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Button asChild>
          <Link href="/auth/login">Entrar</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/sign-up">Cadastrar</Link>
        </Button>
      </div>
    </div>
  );
}
