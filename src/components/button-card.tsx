import Link from "next/link"
import { ElementType } from "react"

interface Props {
  icon: ElementType
  label: string
  href: string
}

export function ButtonCard({ icon: Icon, label, href }: Props) {
  return (
    <Link href={href} className="flex flex-col h-[6rem] w-[6rem] items-center p-2 justify-around rounded-md border-2 border-primary md:flex-row md:w-auto md:h-auto md:px-6 md:py-4 md:gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
      <Icon className="h-6 w-6" />

      <span className="text-sm text-center">{label}</span>
    </Link>
  )
}