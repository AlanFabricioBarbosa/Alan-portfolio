import { Section } from "@/components/ui/Section";

const skills = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "HTML / CSS", level: 95 },
  { name: "Git", level: 80 },
  { name: "Node.js", level: 70 },
];

export function Skills() {
  return (
    <Section
      id="habilidades"
      heading="Habilidades"
      subheading="Tecnologias e ferramentas que utilizo"
      className="bg-muted/30"
    >
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
