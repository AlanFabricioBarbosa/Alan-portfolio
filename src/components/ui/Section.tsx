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
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {subheading}
                </p>
              )}
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
