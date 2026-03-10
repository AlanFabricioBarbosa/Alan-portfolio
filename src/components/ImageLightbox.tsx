"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
};

export function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isClosing, setIsClosing] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  const prev = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [close, prev, next]);

  // Swipe support
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || zoomed) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) prev();
      else next();
    }
    touchStart.current = null;
  };

  const current = images[index];

  const content = (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[9999] flex flex-col transition-opacity duration-250 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      {/* Backdrop — click to close */}
      <div className="absolute inset-0 bg-black/95" onClick={close} />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {images.length > 1 && (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/80">
              {index + 1} de {images.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
            aria-label={zoomed ? "Reduzir" : "Ampliar"}
          >
            {zoomed ? <ZoomOut className="h-4.5 w-4.5" /> : <ZoomIn className="h-4.5 w-4.5" />}
          </button>
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

      {/* Main image area — click empty space to close */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16" onClick={close}>
        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/15 hover:text-white focus:outline-none sm:left-4 sm:p-3"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/15 hover:text-white focus:outline-none sm:right-4 sm:p-3"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        {/* Image */}
        <div
          className={`flex flex-col items-center gap-3 transition-transform duration-500 ease-out ${
            zoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
          }`}
          onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl shadow-black/50 animate-in select-none sm:max-h-[78vh] sm:max-w-[80vw]"
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom bar: caption + thumbnails */}
      <div className="relative z-20 flex flex-col items-center gap-3 px-4 pb-4 pt-2 sm:px-6">
        <p className="max-w-lg text-center text-xs font-medium text-white/40">
          {current.alt}
        </p>

        {images.length > 1 && (
          <div className="flex items-center gap-2">
            {images.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={(e) => { e.stopPropagation(); setZoomed(false); setIndex(idx); }}
                className={`overflow-hidden rounded-md border-2 transition-all duration-300 ${
                  idx === index
                    ? "h-11 w-16 border-primary opacity-100 shadow-lg shadow-primary/20 sm:h-13 sm:w-18"
                    : "h-9 w-13 border-transparent opacity-40 hover:opacity-70 sm:h-11 sm:w-15"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
