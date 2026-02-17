"use client";

import { useContactModal } from "@/components/ContactModalProvider";

export function Footer() {
  const { openModal } = useContactModal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Alan. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/AlanFabricioBarbosa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alanfabriciodev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <button
            onClick={openModal}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </button>
        </div>
      </div>
    </footer>
  );
}
