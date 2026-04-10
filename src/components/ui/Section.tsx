import { ComponentProps } from "react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

type SectionProps = ComponentProps<"section"> & {
  heading?: string;
  subheading?: string;
};

export function Section({
  heading,
  subheading,
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section className={`py-20 sm:py-28 ${className}`} {...props}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <AnimateOnScroll>
            <div className="mb-14 text-center">
              <h2 className="gradient-text inline-block text-3xl font-bold tracking-tight sm:text-4xl">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {subheading}
                </p>
              )}
              {/* Decorative line */}
              <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            </div>
          </AnimateOnScroll>
        )}
        <AnimateOnScroll delay={150}>
          {children}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
