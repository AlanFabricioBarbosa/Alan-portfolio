import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const projects = [
  {
    title: "E-commerce App",
    description:
      "Loja virtual completa com carrinho, pagamento e painel administrativo. Construída com Next.js e Stripe.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    href: "https://github.com",
  },
  {
    title: "Dashboard Analytics",
    description:
      "Painel de analytics interativo com gráficos dinâmicos e visualização de dados em tempo real.",
    tags: ["React", "Chart.js", "TypeScript", "REST API"],
    href: "https://github.com",
  },
  {
    title: "Blog Pessoal",
    description:
      "Blog com suporte a MDX, SEO otimizado, modo escuro e sistema de comentários.",
    tags: ["Next.js", "MDX", "Tailwind CSS"],
    href: "https://github.com",
  },
];

export function Projects() {
  return (
    <Section
      id="projetos"
      heading="Projetos"
      subheading="Alguns dos meus trabalhos recentes"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} {...project} />
        ))}
      </div>
    </Section>
  );
}
