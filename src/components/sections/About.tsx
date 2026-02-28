import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section
      id="sobre"
      heading="Sobre mim"
      subheading="Conheça um pouco mais sobre minha trajetória"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Desenvolvedor com experiência prática em front-end na
          plataforma Fluig e sólida base em JavaScript, ReactJS, Python, Git e
          fundamentos de desenvolvimento web. Atuei como estagiário front-end na
          VFlows, onde construí formulários dinâmicos, automatizações e
          integrações BPM.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Paralelamente, me desenvolvo como Back-End pela Plataforma Impact,
          recebendo mentoria técnica com foco em estruturas de dados, Docker,
          bancos de dados, orientação a objetos e arquitetura de software.
        </p>
      </div>
    </Section>
  );
}
 