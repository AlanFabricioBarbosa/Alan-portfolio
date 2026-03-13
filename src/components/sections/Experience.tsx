"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PdfViewer } from "@/components/PdfViewer";
import { ChevronDown, ImageIcon, FileText, ExternalLink } from "lucide-react";

type MediaItem = {
  type: "image" | "pdf";
  src: string;
  alt: string;
};

type ExperienceItem = {
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  recommendationLetter?: { src: string; alt: string };
};

const experiences: ExperienceItem[] = [
  {
    role: "Estagiário em Desenvolvimento Fluig",
    company: "VFlows",
    type: "Estágio",
    period: "Set 2025 — Fev 2026",
    description:
      "Estagiário em Desenvolvimento Fluig, com foco em soluções front-end e integrações de processos BPM. Responsável pelo desenvolvimento de formulários dinâmicos, datasets personalizados e automações de fluxo, utilizando JavaScript e jQuery para aprimorar interfaces e otimizar a experiência do usuário na plataforma Fluig.",
    tags: ["Fluig", "JavaScript", "jQuery", "BPM", "Front-End"],
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
    role: "Voluntário — Apoio Técnico",
    company: "Plataforma Impact",
    type: "Voluntariado",
    period: "Fev 2025 — Presente",
    description:
      "Apoio técnico a alunos nas trilhas de back-end e fundamentos de programação.",
    tags: ["Back-End", "Mentoria", "Programação"],
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

  const toggle = (company: string) =>
    setExpanded((prev) => (prev === company ? null : company));

  const openLightbox = useCallback((images: MediaItem[], index: number) => {
    setLightbox({ images, index });
  }, []);

  // Close expanded media when user scrolls out of the experience section
  // Uses a delayed approach to avoid layout shift during scroll
  useEffect(() => {
    if (!expanded || !sectionRef.current) return;

    let timeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Wait until the section is fully off-screen, then collapse without layout shift
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
      heading="Experiência"
      subheading="Minha trajetória profissional"
    >
      <div ref={sectionRef} className="mx-auto max-w-3xl">
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border sm:before:left-[9px]">
          {experiences.map((exp, i) => {
            const isOpen = expanded === exp.company;
            const images = exp.media.filter((m) => m.type === "image");
            const pdfs = exp.media.filter((m) => m.type === "pdf");
            const hasMedia = exp.media.length > 0;

            return (
              <AnimateOnScroll key={exp.company} delay={i * 150}>
                <div className="group relative pl-10 sm:pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary sm:h-5 sm:w-5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary transition-colors group-hover:bg-background sm:h-2 sm:w-2" />
                  </div>

                  <div className="rounded-xl border border-border bg-background p-6 transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
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
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    {(hasMedia || exp.recommendationLetter) && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {exp.recommendationLetter && (
                          <button
                            type="button"
                            onClick={() => setPdfView({ src: exp.recommendationLetter!.src, title: exp.recommendationLetter!.alt })}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Carta de Recomendação</span>
                          </button>
                        )}

                        {hasMedia && (
                          <button
                            type="button"
                            onClick={() => toggle(exp.company)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                            aria-expanded={isOpen}
                          >
                            <ImageIcon className="h-3 w-3" />
                            <span>{isOpen ? "Ocultar mídia" : `Ver mídia (${exp.media.length})`}</span>
                            <ChevronDown
                              className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Expandable media section */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-400 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`space-y-2.5 pt-4 ${isOpen ? "" : "pointer-events-none"}`}>
                        {/* Image thumbnails */}
                        {images.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {images.map((img, idx) => (
                              <button
                                key={img.src}
                                type="button"
                                onClick={() => openLightbox(images, idx)}
                                className="group/thumb relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-border bg-muted transition-all hover:border-primary/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                                    Ampliar
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* PDF links */}
                        {pdfs.length > 0 && pdfs.map((pdf) => (
                          <button
                            key={pdf.src}
                            type="button"
                            onClick={() => setPdfView({ src: pdf.src, title: pdf.alt })}
                            className="group/pdf flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-left transition-all hover:border-primary/40 hover:bg-muted/80"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors group-hover/pdf:bg-red-500/20">
                              <FileText className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-foreground group-hover/pdf:text-primary transition-colors">{pdf.alt}</span>
                              <span className="block text-[11px] text-muted-foreground">Clique para visualizar</span>
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

      {/* Lightbox — uses React Portal, renders in document.body */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* PDF Viewer — uses React Portal, renders in document.body */}
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
