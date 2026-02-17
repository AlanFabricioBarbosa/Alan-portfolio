"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#formacao", label: "Formação" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="text-xl font-bold tracking-tight text-foreground">
            &lt;Alan /&gt;
          </a>

          {/* Desktop nav */}
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={`block h-[2px] w-5 rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile nav panel */}
      <nav
        className={`fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-1 border-b border-border bg-background/95 px-6 pb-8 pt-4 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
