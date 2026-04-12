"use client";

import { useRef, useState, useCallback, ReactNode } from "react";

type MagneticWrapperProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function MagneticWrapper({
  children,
  className = "",
  intensity = 0.15,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      setOffset({ x: dx * intensity, y: dy * intensity });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "transform 0.15s ease-out",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}
