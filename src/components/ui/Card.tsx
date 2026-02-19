type CardProps = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
};

export function Card({ title, description, tags, href }: CardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex flex-col rounded-xl border border-border bg-background p-6 transition-[border-color,box-shadow] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="text-lg font-semibold group-hover:text-primary">
        {title}
        {href && <span className="sr-only"> (abre em nova aba)</span>}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  );
}
