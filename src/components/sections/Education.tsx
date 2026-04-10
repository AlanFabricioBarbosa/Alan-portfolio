"use client";

import { Section } from "@/components/ui/Section";
import { MentorshipCard } from "@/components/MentorshipCard";
import { useLanguage } from "@/components/LanguageProvider";

export function Education() {
  const { t } = useLanguage();

  return (
    <Section
      id="formacao"
      heading={t.education.heading}
      subheading={t.education.subheading}
      className="bg-muted/30"
    >
      <div className="mx-auto max-w-4xl space-y-14">
        {/* Formação Acadêmica */}
        <div>
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            {t.education.academicTitle}
          </h3>
          <div className="mx-auto max-w-2xl">
            {t.education.degrees.map((edu) => (
              <div
                key={edu.institution}
                className="group flex items-start rounded-2xl border border-border/50 glass p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
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
            {t.education.mentorshipTitle}
          </h3>
          <div className="flex flex-wrap gap-4">
            {t.education.mentorships.map((m) => (
              <MentorshipCard key={m.title} mentorship={m} />
            ))}
          </div>
        </div>

        {/* Certificados */}
        <div>
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            {t.education.certificationsTitle}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.education.certifications.map((cert) => (
              <div
                key={cert.name}
                className="group flex flex-col rounded-2xl border border-border/50 glass p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-start">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold leading-snug transition-colors duration-300 group-hover:text-primary">
                      {cert.name}
                    </h4>
                    <p className="mt-1 text-sm text-primary">
                      {cert.institution}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t.education.issuedAt} {cert.date}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
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
