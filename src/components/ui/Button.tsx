"use client";

import { ComponentProps, useRef, useState, useCallback } from "react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setOffset({ x: dx * 0.15, y: dy * 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const base =
    "relative inline-flex cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-[position:100%_0]",
    outline:
      "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-lg hover:shadow-primary/5",
  };

  return (
    <a
      ref={ref}
      className={`group ${base} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), all 0.3s"
          : "transform 0.15s ease-out, all 0.3s",
      }}
      {...props}
    >
      {children}
      {/* Shine sweep effect on hover */}
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <span className="absolute inset-0 -translate-x-full skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_0.6s_ease-out_forwards]" />
        </span>
      )}
    </a>
  );
}
