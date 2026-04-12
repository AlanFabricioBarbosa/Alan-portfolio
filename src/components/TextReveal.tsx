"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
};

export function TextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || !ref.current) return;
    // Add 'revealed' class to all text-reveal children
    const els = ref.current.querySelectorAll(".text-reveal, .text-reveal-line");
    els.forEach((el) => el.classList.add("revealed"));
  }, [revealed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
