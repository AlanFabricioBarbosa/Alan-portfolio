import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function Contact() {
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
          <Button href="mailto:email@exemplo.com">Enviar Email</Button>
          <Button
            href="https://linkedin.com"
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            href="https://github.com"
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
