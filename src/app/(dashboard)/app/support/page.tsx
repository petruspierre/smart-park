import { ButtonCard } from "@/components/button-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone } from "lucide-react";

export default function Support() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-2xl">Suporte</h1>

      <section className="w-full my-6">
        <h2 className="font-bold text-xl">Perguntas frequentes</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Lorem ipsum dolor sit amet</AccordionTrigger>
            <AccordionContent>
              Sed cursus est vel augue dignissim, vitae malesuada arcu eleifend. Nunc at dolor sit amet augue venenatis maximus in sed ligula.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Integer at tincidunt arcu</AccordionTrigger>
            <AccordionContent>
              Sed cursus est vel augue dignissim, vitae malesuada arcu eleifend. Nunc at dolor sit amet augue venenatis maximus in sed ligula.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Nulla lobortis velit et metus mollis egestas</AccordionTrigger>
            <AccordionContent>
              Sed cursus est vel augue dignissim, vitae malesuada arcu eleifend. Nunc at dolor sit amet augue venenatis maximus in sed ligula.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-bold text-xl">Ainda tem dúvidas?</h2>
          <p>Escolha o meio de contato:</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ButtonCard 
            icon={Phone}
            label="Telefone"
            href="tel:+5583999999999"
          />

          <ButtonCard 
            icon={Mail}
            label="E-mail"
            href="mailto:petrus.bento@cs.unipe.edu.br"
          />
        </div>
      </section>
    </div>
  )
}