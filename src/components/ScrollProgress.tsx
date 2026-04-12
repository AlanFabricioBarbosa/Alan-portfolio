"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress(Math.min(scrollTop / docHeight, 1));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        width: "100%",
        transform: `scaleX(${progress})`,
        background: "linear-gradient(90deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
        transition: "transform 0.1s ease-out",
        boxShadow: progress > 0 ? "0 0 8px var(--glow)" : "none",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso da página"
    />
  );
}
