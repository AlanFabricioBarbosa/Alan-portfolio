"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

const roles = ["Programador", "Front-End", "Fluig TOTVS", "Back-End"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/[0.07] blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 transition-[opacity,transform] duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-primary">
              Disponível para projetos
            </span>
          </div>

          <p className={`text-lg font-medium text-muted-foreground transition-[opacity,transform] duration-700 ease-out delay-100 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            Olá, eu sou
          </p>

          <h1 className={`mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl transition-[opacity,transform] duration-700 ease-out delay-200 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Alan Fabrício
            </span>
          </h1>

          <h2 className={`mt-5 flex items-center gap-1 text-2xl font-medium text-muted-foreground sm:text-3xl lg:text-4xl transition-[opacity,transform] duration-700 ease-out delay-300 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <span>{displayed}</span>
            <span className="inline-block w-[3px] animate-pulse bg-primary" style={{ height: "1em" }} aria-hidden="true" />
          </h2>

          <p className={`mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] duration-700 ease-out delay-[400ms] ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            Transformando ideias em experiências digitais com código limpo,
            design moderno e atenção aos detalhes.
          </p>

          <div className={`mt-12 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 transition-[opacity,transform] duration-700 ease-out delay-500 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <Button href="#experiencia" className="w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Ver Experiência
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
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
              </span>
            </Button>
            <Button href="#contato" variant="outline" className="w-full sm:w-auto">
              Entrar em Contato
            </Button>
            <a
              href="/cv-alan-fabricio.pdf"
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-auto"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Baixar CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
