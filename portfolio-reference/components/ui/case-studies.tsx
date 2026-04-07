"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Monitor, LayoutDashboard, Users } from "lucide-react";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

export type CaseStudy = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  icon?: "monitor" | "dashboard" | "users";
  metrics: { value: string; label: string; sub?: string }[];
};

const defaultStudies: CaseStudy[] = [
  {
    id: "elevatr",
    quote: "Placeholder quote for project outcome. Replace this with your real project write-up.",
    name: "Project Placeholder",
    role: "Your role goes here",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
    icon: "monitor",
    metrics: [
      { value: "40%", label: "Placeholder Metric", sub: "Replace with real number" },
      { value: "95%", label: "Placeholder Metric", sub: "Replace with real number" },
    ],
  },
];

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

function getIcon(icon: CaseStudy["icon"]) {
  if (icon === "dashboard") return LayoutDashboard;
  if (icon === "users") return Users;
  return Monitor;
}

export default function CaseStudies({
  studies = defaultStudies,
  title = "Project Details",
  subtitle = "Click a project to open all relevant info.",
}: {
  studies?: CaseStudy[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 bg-background" aria-labelledby="case-studies-heading">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2 id="case-studies-heading" className="text-4xl font-semibold md:text-5xl text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-16 flex flex-col gap-16">
          {studies.map((study, idx) => {
            const reversed = idx % 2 === 1;
            const Icon = getIcon(study.icon);
            return (
              <div
                key={study.id}
                className="grid gap-10 lg:grid-cols-3 xl:gap-16 items-center border-b border-gray-200 dark:border-gray-800 pb-12"
              >
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-8 lg:col-span-2 lg:border-r lg:pr-12 text-left",
                    reversed ? "lg:order-2 lg:border-r-0 lg:border-l border-gray-200 dark:border-gray-800 lg:pl-12 lg:pr-0" : "",
                  ].join(" ")}
                >
                  <img src={study.image} alt={`${study.name} project preview`} className="aspect-[29/35] h-auto w-full max-w-60 rounded-2xl object-cover ring-1 ring-border" />
                  <figure className="flex flex-col justify-between gap-6 text-left">
                    <blockquote className="text-lg text-foreground leading-relaxed text-left">
                      <h3 className="text-lg font-normal text-gray-900 dark:text-white leading-relaxed text-left">
                        <span className="inline-flex items-center gap-2">
                          <Icon className="h-5 w-5 text-zinc-400" />
                          Relevant Case Study
                        </span>
                        <span className="block text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-3">
                          {study.quote}
                        </span>
                      </h3>
                    </blockquote>
                    <figcaption className="flex flex-col gap-1 mt-4 text-left">
                      <span className="text-md font-medium text-foreground">{study.name}</span>
                      <span className="text-sm text-muted-foreground">{study.role}</span>
                    </figcaption>
                  </figure>
                </div>

                <div className={["grid grid-cols-1 gap-4 self-center text-left", reversed ? "lg:order-1" : ""].join(" ")}>
                  {study.metrics.map((metric, i) => (
                    <MetricStat key={`${study.id}-${i}`} value={metric.value} label={metric.label} sub={metric.sub} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
