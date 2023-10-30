import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>

      </div>

      <div className='flex flex-col gap-10'>
        <img
          src="/smartPark.svg"
          alt="Logo do Smart Park"
        />

        <div className='flex flex-col gap-2'>
          <Button asChild>
            <Link href="/auth/login">
              Entrar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth/sign-up">
              Cadastrar
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
