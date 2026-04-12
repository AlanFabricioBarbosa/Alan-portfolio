"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/ContactModalProvider";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { useLanguage } from "@/components/LanguageProvider";

export function Contact() {
  const { openModal } = useContactModal();
  const { t } = useLanguage();

  return (
    <Section
      id="contato"
      heading={t.contact.heading}
      subheading={t.contact.subheading}
    >
      <div className="relative mx-auto max-w-xl text-center">
        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t.contact.description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <MagneticWrapper>
              <button
                onClick={openModal}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[position:100%_0] hover:shadow-xl hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-auto"
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
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {t.contact.sendEmail}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_0.6s_ease-out_forwards]" />
                </span>
              </button>
            </MagneticWrapper>
            <Button
              href="https://www.linkedin.com/in/alanfabriciodev/"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              LinkedIn<span className="sr-only"> {t.a11y.opensNewTab}</span>
            </Button>
            <Button
              href="https://github.com/AlanFabricioBarbosa"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              GitHub<span className="sr-only"> {t.a11y.opensNewTab}</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
