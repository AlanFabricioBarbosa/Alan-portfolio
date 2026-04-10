"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PdfViewer } from "@/components/PdfViewer";
import { ChevronDown, ImageIcon, FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type MediaItem = {
  type: "image" | "pdf";
  src: string;
  alt: string;
};

type ExperienceMedia = {
  media: MediaItem[];
  recommendationLetter?: { src: string; alt: string };
};

// Media data stays the same regardless of language
const experienceMedia: ExperienceMedia[] = [
  {
    media: [
      { type: "image", src: "/experience_img/VFlows/1762822437583.jpeg", alt: "VFlows — Captura 1" },
      { type: "image", src: "/experience_img/VFlows/1762822529188.jpeg", alt: "VFlows — Captura 2" },
      { type: "pdf", src: "/experience_img/VFlows/Certificado Bootcamp - Alan Fabrício Barbosa da Silva [assinado].pdf", alt: "Certificado Bootcamp" },
    ],
    recommendationLetter: {
      src: "/experience_img/VFlows/Carta de recomendação Alan Fabrício [assinado].pdf",
      alt: "Carta de Recomendação",
    },
  },
  {
    media: [
      { type: "image", src: "/experience_img/PlataformaImpact/1765325649359.jpeg", alt: "Plataforma Impact — Captura 1" },
      { type: "image", src: "/experience_img/PlataformaImpact/1769213131847.jpeg", alt: "Plataforma Impact — Captura 2" },
      { type: "image", src: "/experience_img/PlataformaImpact/Captura de tela de 2026-03-10 01-55-58.png", alt: "Plataforma Impact — Captura 3" },
      { type: "image", src: "/experience_img/PlataformaImpact/Captura de tela de 2026-03-10 01-57-52.png", alt: "Plataforma Impact — Captura 4" },
      { type: "image", src: "/experience_img/PlataformaImpact/Captura de tela de 2026-03-10 01-59-13.png", alt: "Plataforma Impact — Captura 5" },
      { type: "image", src: "/experience_img/PlataformaImpact/Captura de tela de 2026-03-10 02-04-13.png", alt: "Plataforma Impact — Captura 6" },
    ],
  },
];

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: MediaItem[]; index: number } | null>(null);
  const [pdfView, setPdfView] = useState<{ src: string; title: string } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const toggle = (company: string) =>
    setExpanded((prev) => (prev === company ? null : company));

  const openLightbox = useCallback((images: MediaItem[], index: number) => {
    setLightbox({ images, index });
  }, []);

  useEffect(() => {
    if (!expanded || !sectionRef.current) return;

    let timeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          timeout = setTimeout(() => {
            setExpanded(null);
          }, 500);
        } else {
          clearTimeout(timeout);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [expanded]);

  return (
    <Section
      id="experiencia"
      heading={t.experience.heading}
      subheading={t.experience.subheading}
    >
      <div ref={sectionRef} className="mx-auto max-w-3xl">
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-accent/30 before:to-border sm:before:left-[9px]">
          {t.experience.items.map((exp, i) => {
            const mediaData = experienceMedia[i];
            const isOpen = expanded === exp.company;
            const allMedia = mediaData?.media ?? [];
            const images = allMedia.filter((m) => m.type === "image");
            const pdfs = allMedia.filter((m) => m.type === "pdf");
            const hasMedia = allMedia.length > 0;
            const isCurrent = exp.period.includes("Present") || exp.period.includes("Presente");

            return (
              <AnimateOnScroll key={exp.company} delay={i * 150}>
                <div className="group relative pl-10 sm:pl-12">
                  <div className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_12px_var(--glow)] sm:h-5 sm:w-5 ${isCurrent ? "shadow-[0_0_8px_var(--glow)]" : ""}`}>
                    <div className={`h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-background sm:h-2 sm:w-2 ${isCurrent ? "animate-pulse" : ""}`} />
                  </div>

                  <div className="rounded-2xl border border-border/50 glass p-6 transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-0.5 text-xs font-medium text-primary">
                        {exp.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{exp.role}</h3>
                    <p className="text-sm font-medium text-primary">{exp.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(hasMedia || mediaData?.recommendationLetter) && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {mediaData?.recommendationLetter && (
                          <button
                            type="button"
                            onClick={() => setPdfView({ src: mediaData.recommendationLetter!.src, title: mediaData.recommendationLetter!.alt })}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1.5 text-xs font-medium text-primary transition-all duration-300 hover:from-primary/20 hover:to-accent/20 hover:shadow-[0_0_12px_var(--glow)]"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{t.experience.recommendationLetter}</span>
                          </button>
                        )}

                        {hasMedia && (
                          <button
                            type="button"
                            onClick={() => toggle(exp.company)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                            aria-expanded={isOpen}
                          >
                            <ImageIcon className="h-3 w-3" />
                            <span>{isOpen ? t.experience.hideMedia : `${t.experience.viewMedia} (${allMedia.length})`}</span>
                            <ChevronDown
                              className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    )}

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-400 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`space-y-2.5 pt-4 ${isOpen ? "" : "pointer-events-none"}`}>
                        {images.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {images.map((img, idx) => (
                              <button
                                key={img.src}
                                type="button"
                                onClick={() => openLightbox(images, idx)}
                                className="group/thumb relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-muted transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/thumb:bg-black/40" />
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-gray-900 shadow-lg backdrop-blur-sm">
                                    <ImageIcon className="h-3.5 w-3.5" />
                                    {t.experience.enlarge}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {pdfs.length > 0 && pdfs.map((pdf) => (
                          <button
                            key={pdf.src}
                            type="button"
                            onClick={() => setPdfView({ src: pdf.src, title: pdf.alt })}
                            className="group/pdf flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border/50 bg-muted/40 px-4 py-3 text-left transition-all duration-300 hover:border-primary/40 hover:bg-muted/80 hover:shadow-lg hover:shadow-primary/5"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-colors group-hover/pdf:bg-red-500/20">
                              <FileText className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-foreground group-hover/pdf:text-primary transition-colors">{pdf.alt}</span>
                              <span className="block text-[11px] text-muted-foreground">{t.experience.clickToView}</span>
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover/pdf:text-primary" />
                          </button>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {pdfView && (
        <PdfViewer
          src={pdfView.src}
          title={pdfView.title}
          onClose={() => setPdfView(null)}
        />
      )}
    </Section>
  );
}
