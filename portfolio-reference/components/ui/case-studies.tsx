"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

export type CaseStudyRow = {
  heading: string;
  body: string;
  image: string;
  imageAlt?: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  role: string;
  metrics: { value: string; label: string; sub?: string }[];
  rows: CaseStudyRow[];
};

const defaultStudy: CaseStudy = {
  id: "placeholder",
  name: "Project",
  role: "Your role — edit in page.tsx",
  metrics: [
    { value: "0", label: "Metric", sub: "Edit me" },
    { value: "0", label: "Metric", sub: "Edit me" },
  ],
  rows: [
    {
      heading: "Row 1 — edit heading",
      body: "Replace this paragraph with your own copy. You can describe the problem, the brief, or the first milestone. Add more detail here so the section feels substantial when you scroll.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
      imageAlt: "Placeholder screenshot 1",
    },
    {
      heading: "Row 2 — edit heading",
      body: "Second block of text for the middle row. Swap the image to the other side on desktop. Mention process, constraints, or what you iterated on.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=80",
      imageAlt: "Placeholder screenshot 2",
    },
    {
      heading: "Row 3 — edit heading",
      body: "Third row: outcomes, learnings, or what you would do next. Replace images and copy when you send final assets.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
      imageAlt: "Placeholder screenshot 3",
    },
  ],
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(/^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/);
  if (!m) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = normalized.split(".")[1]?.length ?? 0;
  return { prefix: prefix ?? "", end: isNaN(end) ? 0 : end, suffix: suffix ?? "", decimals };
}

function MetricStat({ value, label, sub, duration = 1.6 }: { value: string; label: string; sub?: string; duration?: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);
  return (
    <div className="flex flex-col gap-2 text-left p-6 rounded-xl bg-zinc-900 border border-zinc-800">
      <p className="text-2xl font-medium text-white sm:text-4xl" aria-label={`${label} ${value}`}>
        {prefix}
        {reduceMotion ? (
          <span>{end.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        ) : (
          <CountUp end={end} decimals={decimals} duration={duration} separator="," enableScrollSpy scrollSpyOnce />
        )}
        {suffix}
      </p>
      <p className="font-medium text-white">{label}</p>
      {sub ? <p className="text-zinc-400">{sub}</p> : null}
    </div>
  );
}

export default function CaseStudies({
  studies = [defaultStudy],
  title = "Project Details",
  subtitle = "Three highlights — swap images and copy below when you have finals.",
}: {
  studies?: CaseStudy[];
  title?: string;
  subtitle?: string;
}) {
  const study = studies[0];

  return (
    <section className="py-20 bg-background" aria-labelledby="case-studies-heading">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto mb-14">
          <h2 id="case-studies-heading" className="text-4xl font-semibold md:text-5xl text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{study.name}</span>
            <span className="hidden sm:inline text-zinc-600">·</span>
            <span>{study.role}</span>
          </div>
        </div>

        <div className="flex flex-col gap-20 md:gap-24">
          {study.rows.map((row, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <div
                key={`${study.id}-row-${index}`}
                className={`flex flex-col gap-8 md:gap-12 md:flex-row md:items-center ${
                  imageFirst ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2 shrink-0">
                  <img
                    src={row.image}
                    alt={row.imageAlt ?? `${study.name} — ${row.heading}`}
                    className="w-full rounded-2xl object-cover aspect-[4/3] ring-1 ring-border shadow-2xl"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-4 text-left">
                  <h3 className="text-2xl font-semibold text-foreground tracking-tight">{row.heading}</h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{row.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {study.metrics.map((metric, i) => (
            <MetricStat key={`${study.id}-metric-${i}`} value={metric.value} label={metric.label} sub={metric.sub} />
          ))}
        </div>
      </div>
    </section>
  );
}
