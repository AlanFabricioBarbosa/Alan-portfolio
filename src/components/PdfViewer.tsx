"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";

type PdfViewerProps = {
  src: string;
  title: string;
  onClose: () => void;
};

export function PdfViewer({ src, title, onClose }: PdfViewerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [close]);

  const content = (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex flex-col transition-opacity duration-250 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" onClick={close} />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6">
        <h3 className="truncate text-sm font-medium text-white/80">{title}</h3>

        <div className="flex items-center gap-1">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
            aria-label="Abrir em nova aba"
          >
            <ExternalLink className="h-4.5 w-4.5" />
          </a>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 px-4 pb-4 sm:px-6">
        <iframe
          src={`${src}#toolbar=0&navpanes=0`}
          title={title}
          className="h-full w-full rounded-lg border border-white/10 bg-white animate-in"
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
