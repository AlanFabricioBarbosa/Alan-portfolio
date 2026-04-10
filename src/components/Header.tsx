"use client";

import { useState, useEffect } from "react";
import { User, Code, Briefcase, GraduationCap, Mail, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { locale, t, toggleLocale } = useLanguage();

  const navLinks = [
    { href: "#sobre", label: t.nav.about, icon: User },
    { href: "#habilidades", label: t.nav.skills, icon: Code },
    { href: "#experiencia", label: t.nav.experience, icon: Briefcase },
    { href: "#formacao", label: t.nav.education, icon: GraduationCap },
    { href: "#contato", label: t.nav.contact, icon: Mail },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent body scroll when menu is open + Escape key to close
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      function onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") setMenuOpen(false);
      }
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
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
        className={`sticky top-0 z-50 border-b border-border/50 glass transition-opacity duration-300 ${
          scrolled ? "lg:pointer-events-none lg:opacity-0" : "opacity-100"
        }`}
        {...(scrolled && isDesktop ? { inert: true } : {})}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="text-xl font-bold tracking-tight transition-colors hover:text-primary">
            <span className="gradient-text">&lt;Alan /&gt;</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Menu principal" className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
                </a>
              );
            })}

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
              className="flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_var(--glow)]"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{locale === "pt" ? "EN" : "PT"}</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label={t.nav.toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_var(--glow)]"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted lg:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
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
      <nav
        aria-label="Navegação lateral"
        className={`group/sidebar fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-border/50 glass px-3 py-5 shadow-lg transition-[opacity,transform] duration-300 will-change-transform lg:flex ${
          scrolled
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-6 opacity-0"
        }`}
        {...(!scrolled ? { inert: true } : {})}
      >
        <a
          href="#"
          className="mb-2 flex items-center justify-center px-2 py-1 text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          <span className="gradient-text">&lt;A /&gt;</span>
        </a>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_var(--glow)] ${
                isActive ? "bg-primary/10 text-primary glow-shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:max-w-40 group-hover/sidebar:opacity-100">
                {link.label}
              </span>
            </a>
          );
        })}
        <div className="mt-1 border-t border-border/50 pt-3 space-y-1.5">
          {/* Language toggle in sidebar */}
          <button
            onClick={toggleLocale}
            aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_var(--glow)]"
          >
            <Globe className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:max-w-40 group-hover/sidebar:opacity-100">
              {locale === "pt" ? "English" : "Português"}
            </span>
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t.nav.toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_12px_var(--glow)]"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Moon className="h-5 w-5 shrink-0" aria-hidden="true" />}
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/sidebar:max-w-40 group-hover/sidebar:opacity-100">
              {theme === "dark" ? t.nav.lightTheme : t.nav.darkTheme}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile nav panel */}
      <nav
        aria-label="Menu mobile"
        className={`fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-1 border-b border-border/50 glass px-6 pb-8 pt-4 shadow-xl transition-[opacity,transform] duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        {...(!menuOpen ? { inert: true } : {})}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-xl px-4 py-3 text-center text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => { toggleLocale(); setMenuOpen(false); }}
          className="w-full rounded-xl px-4 py-3 text-center text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
        >
          🌐 {locale === "pt" ? "English" : "Português"}
        </button>
        <button
          onClick={() => { toggleTheme(); setMenuOpen(false); }}
          className="w-full rounded-xl px-4 py-3 text-center text-base font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
        >
          {theme === "dark" ? t.nav.lightThemeEmoji : t.nav.darkThemeEmoji}
        </button>
      </nav>
    </>
  );
}
