import { Section } from "@/components/ui/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const experiences = [
  {
    role: "Estagiário em Desenvolvimento Fluig",
    company: "VFlows",
    type: "Estágio",
    period: "Set 2025 — Fev 2026",
    description:
      "Estagiário em Desenvolvimento Fluig, com foco em soluções front-end e integrações de processos BPM. Responsável pelo desenvolvimento de formulários dinâmicos, datasets personalizados e automações de fluxo, utilizando JavaScript e jQuery para aprimorar interfaces e otimizar a experiência do usuário na plataforma Fluig.",
    tags: ["Fluig", "JavaScript", "jQuery", "BPM", "Front-End"],
  },
  {
    role: "Voluntário — Apoio Técnico",
    company: "Plataforma Impact",
    type: "Voluntariado",
    period: "Fev 2025 — Presente",
    description:
      "Apoio técnico a alunos nas trilhas de back-end e fundamentos de programação.",
    tags: ["Back-End", "Mentoria", "Programação"],
  },
];

export function Experience() {
  return (
    <Section
      id="experiencia"
      heading="Experiência"
      subheading="Minha trajetória profissional"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border sm:before:left-[9px]">
          {experiences.map((exp, i) => (
            <AnimateOnScroll key={exp.company} delay={i * 150}>
              <div className="group relative pl-10 sm:pl-12">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary sm:h-5 sm:w-5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-background sm:h-2 sm:w-2" />
              </div>

              <div className="rounded-xl border border-border bg-background p-6 transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                    {exp.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{exp.role}</h3>
                <p className="text-sm font-medium text-primary">{exp.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </Section>
  );
}
