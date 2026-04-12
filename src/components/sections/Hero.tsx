"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { ParticleField } from "@/components/ParticleField";

const roles = ["Front-End", "Fluig TOTVS", "Back-End"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();

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
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl" style={{ animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-accent/15 to-primary/5 blur-3xl" style={{ animation: "float 10s ease-in-out infinite reverse" }} />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] blur-3xl" style={{ animation: "float 12s ease-in-out infinite" }} />
        <ParticleField count={35} />
      </div>

      {/* Dot grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text content */}
          <div className="max-w-3xl flex-1">
            {/* Status badge with glow */}
            <div className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 transition-[opacity,transform] duration-700 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ animation: loaded ? "glow-pulse 3s ease-in-out infinite" : "none" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-primary">
                {t.hero.availableBadge}
              </span>
            </div>

            <p className={`text-lg font-medium text-muted-foreground transition-[opacity,transform] duration-700 ease-out delay-100 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              {t.hero.greeting}
            </p>

            <h1 className={`mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl transition-[opacity,transform] duration-700 ease-out delay-200 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <span className="gradient-text">
                Alan Fabrício
              </span>
            </h1>

            <h2 className={`mt-5 flex items-center gap-1 text-2xl font-medium text-muted-foreground sm:text-3xl lg:text-4xl transition-[opacity,transform] duration-700 ease-out delay-300 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <span>{displayed}</span>
              <span
                className="inline-block w-[3px] bg-primary shadow-[0_0_8px_var(--glow)] animate-pulse"
                style={{ height: "1em" }}
                aria-hidden="true"
              />
            </h2>

            <p className={`mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground transition-[opacity,transform] duration-700 ease-out delay-[400ms] ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              {t.hero.description}
            </p>

            <div className={`mt-12 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 transition-[opacity,transform] duration-700 ease-out delay-500 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <Button href="#experiencia" className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  {t.hero.viewExperience}
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
                {t.hero.getInTouch}
              </Button>
              <a
                href="/cv-alan-fabricio.pdf"
                download
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-auto"
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
                {t.hero.downloadCV}
              </a>
            </div>
          </div>

          {/* Profile photo */}
          <div className={`shrink-0 transition-[opacity,transform] duration-700 ease-out delay-300 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-70 blur-sm" style={{ animation: "glow-pulse 4s ease-in-out infinite" }} />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-50" />
              {/* Photo */}
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-background sm:h-56 sm:w-56 lg:h-64 lg:w-64">
                <Image
                  src="/profile.jpg"
                  alt={t.hero.profileAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
