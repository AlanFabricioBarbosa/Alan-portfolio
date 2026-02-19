"use client";

import { useState, useEffect } from "react";
import { User, Code, Briefcase, GraduationCap, Mail } from "lucide-react";

const navLinks = [
  { href: "#sobre", label: "Sobre", icon: User },
  { href: "#habilidades", label: "Habilidades", icon: Code },
  { href: "#experiencia", label: "Experiência", icon: Briefcase },
  { href: "#formacao", label: "Formação", icon: GraduationCap },
  { href: "#contato", label: "Contato", icon: Mail },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Header padrão (topo) */}
      <header
        className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-opacity duration-300 ${
          scrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
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

      {/* Sidebar flutuante (aparece no scroll) — desktop only */}
      <aside
        className={`group/sidebar fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-border bg-background/90 px-3 py-5 shadow-lg backdrop-blur-md transition-all duration-300 md:flex ${
          scrolled
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-6 opacity-0"
        }`}
      >
        <a
          href="#"
          className="mb-2 flex items-center justify-center px-2 py-1 text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          &lt;A /&gt;
        </a>
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:max-w-40 group-hover/sidebar:opacity-100">
                {link.label}
              </span>
            </a>
          );
        })}
      </aside>

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
