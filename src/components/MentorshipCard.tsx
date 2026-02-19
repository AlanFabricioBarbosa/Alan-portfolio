"use client";

import { useState } from "react";

type Mentorship = {
  title: string;
  platform: string;
  mentor: string;
  period: string;
  description: string;
  topics: string[];
  visibleTopics: number;
};

export function MentorshipCard({ mentorship: m }: { mentorship: Mentorship }) {
  const [expanded, setExpanded] = useState(false);

  const hasMore = m.topics.length > m.visibleTopics;
  const visibleList = expanded
    ? m.topics
    : m.topics.slice(0, m.visibleTopics);
  const hiddenCount = m.topics.length - m.visibleTopics;

  return (
    <div className="group flex w-full flex-col rounded-xl border border-border bg-background p-5 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:w-[calc(50%-0.5rem)]">
      <div className="min-w-0">
        <h4 className="text-sm font-semibold leading-snug group-hover:text-primary">
          {m.title}
        </h4>
        <p className="mt-1 text-sm text-primary">{m.platform}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Mentor: {m.mentor} · {m.period}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {m.description}
        </p>
      </div>

      {m.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleList.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {topic}
            </span>
          ))}

          {hasMore && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {expanded ? "Ver menos" : `+${hiddenCount} ver mais`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
