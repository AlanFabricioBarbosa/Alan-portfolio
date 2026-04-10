"use client";

import { useContactModal } from "@/components/ContactModalProvider";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { openModal } = useContactModal();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-muted/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Alan. {t.footer.rights}
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/AlanFabricioBarbosa"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            GitHub<span className="sr-only"> {t.a11y.opensNewTab}</span>
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="https://www.linkedin.com/in/alanfabriciodev/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            LinkedIn<span className="sr-only"> {t.a11y.opensNewTab}</span>
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <button
            onClick={openModal}
            className="group relative cursor-pointer text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            Email
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </footer>
  );
}
