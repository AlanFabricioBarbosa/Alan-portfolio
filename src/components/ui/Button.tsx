import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex cursor-pointer items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-[position:100%_0]",
    outline:
      "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary hover:shadow-lg hover:shadow-primary/5",
  };

  return (
    <a className={`group ${base} ${variants[variant]} ${className}`} {...props}>
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
