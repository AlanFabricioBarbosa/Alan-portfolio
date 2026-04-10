"use client";

import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/components/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <Section
      id="sobre"
      heading={t.about.heading}
      subheading={t.about.subheading}
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-2xl border border-border/50 glass p-8 sm:p-10">
          {/* Decorative gradient corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-tl-2xl bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-br-2xl bg-gradient-to-tl from-accent/10 to-transparent" />

          <div className="relative space-y-6 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.about.p1_prefix}{" "}
              <span className="font-medium text-primary">{t.about.p1_frontend}</span>{" "}
              {t.about.p1_platform}{" "}
              <span className="font-medium text-primary">{t.about.p1_fluig}</span>{" "}
              {t.about.p1_base}{" "}
              <span className="font-medium text-foreground">JavaScript</span>,{" "}
              <span className="font-medium text-foreground">ReactJS</span>,{" "}
              <span className="font-medium text-foreground">Python</span>,{" "}
              <span className="font-medium text-foreground">Git</span>{" "}
              {t.about.p1_and}{" "}
              <span className="font-medium text-primary">{t.about.p1_vflows}</span>
              {t.about.p1_suffix}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.about.p2_prefix}{" "}
              <span className="font-medium text-primary">{t.about.p2_backend}</span>{" "}
              {t.about.p2_via}{" "}
              <span className="font-medium text-primary">{t.about.p2_impact}</span>
              {t.about.p2_suffix}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}