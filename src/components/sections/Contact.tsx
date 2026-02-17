"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/ContactModalProvider";

export function Contact() {
  const { openModal } = useContactModal();

  return (
    <Section
      id="contato"
      heading="Contato"
      subheading="Vamos conversar sobre seu próximo projeto?"
      className="bg-muted/30"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Estou sempre aberto a novas oportunidades e projetos interessantes.
          Sinta-se à vontade para entrar em contato!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Enviar Email
          </button>
          <Button
            href="https://www.linkedin.com/in/alanfabriciodev/"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            href="https://github.com/AlanFabricioBarbosa"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
        </div>
      </div>
    </Section>
  );
}
