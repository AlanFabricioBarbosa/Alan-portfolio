import { Section } from "@/components/ui/Section";
import { MentorshipCard } from "@/components/MentorshipCard";

const education = [
  {
    institution: "Descomplica",
    course: "Análise e Desenvolvimento de Sistemas",
    degree: "Curso Superior de Tecnologia (CST)",
    period: "Ago 2024 — Set 2027",
  },
];

const mentorships = [
  {
    title: "Mentoria Técnica em Back-End",
    platform: "Plataforma Impact",
    mentor: "Rafael \"Fino\" Gottardi",
    period: "Em andamento",
    description:
      "Formação Back-End do programa ONE (Alura) com 7 formações e 332 horas concluídas, complementada por mentoria técnica individual.",
    topics: [
      "Sistemas Operacionais",
      "Terminal Avançado",
      "Tipos de Programas (VM, compilados, scripts, interpretados)",
      "Estruturas de Dados",
      "Fundamentos de Código",
      "Bancos de Dados (SQL e NoSQL)",
      "Orientação a Objetos",
      "Docker",
    ],
    visibleTopics: 3,
  },
  {
    title: "Aulas de Inglês — Nível Intermediário",
    platform: "Plataforma Impact",
    mentor: "Renan Moura",
    period: "Em andamento",
    description:
      "Aulas de inglês focadas no desenvolvimento da comunicação para o mercado de tecnologia.",
    topics: [],
    visibleTopics: 0,
  },
];

const certifications = [
  {
    name: "Programa AWS re/Start e Inteligência Artificial",
    institution: "Escola da Nuvem",
    date: "Out 2025",
    skills: ["Cloud AWS"],
  },
  {
    name: "Formação de Desenvolvedor(a) FullStack",
    institution: "Vai na Web",
    date: "Mai 2025",
    skills: ["HTML5", "SASS", "JavaScript", "React", "Python", "Flask"],
  },
  {
    name: "Programa Oracle Next Education F2 T7 Back-end",
    institution: "Alura",
    date: "Jan 2025",
    skills: ["Lógica de Programação", "Java"],
  },
  {
    name: "Formação de Desenvolvedor(a) em Tecnologia (Front-End)",
    institution: "Vai na Web",
    date: "Dez 2023",
    skills: ["React.js", "JavaScript"],
  },
];

export function Education() {
  return (
    <Section
      id="formacao"
      heading="Formação"
      subheading="Minha trajetória acadêmica e certificações"
      className="bg-muted/30"
    >
      <div className="mx-auto max-w-4xl space-y-14">
        {/* Formação Acadêmica */}
        <div>
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Formação Acadêmica
          </h3>
          <div className="mx-auto max-w-2xl">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="group flex items-start rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div>
                  <h4 className="text-lg font-semibold">{edu.course}</h4>
                  <p className="text-sm font-medium text-primary">
                    {edu.institution}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.degree}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorias e Formação Complementar */}
        <div>
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Mentorias e Formação Complementar
          </h3>
          <div className="flex flex-wrap gap-4">
            {mentorships.map((m) => (
              <MentorshipCard key={m.title} mentorship={m} />
            ))}
          </div>
        </div>

        {/* Certificados */}
        <div>
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Licenças e Certificados
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold leading-snug group-hover:text-primary">
                      {cert.name}
                    </h4>
                    <p className="mt-1 text-sm text-primary">
                      {cert.institution}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Emitida em {cert.date}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
