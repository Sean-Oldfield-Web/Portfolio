"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

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
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
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
      {sub && <p className="text-zinc-400 text-sm">{sub}</p>}
    </div>
  );
}

type ProjectData = {
  name: string;
  tagline: string;
  description: string;
  image: string;
  extraImages?: string[];
  gradientFrom: string;
  gradientTo: string;
  liveUrl?: string;
  stack: string[];
  metrics: { value: string; label: string; sub?: string }[];
  sections: { heading: string; body: string }[];
};

const projects: Record<string, ProjectData> = {
  elevatr: {
    name: "Elevatr",
    tagline: "Habit tracking meets mountain-climbing metaphors",
    description:
      "Elevatr gamifies personal growth by framing your goals as peaks to summit. Each habit you build is a step closer to the top, with a beautiful mountain-chart visualising your progress over time.",
    image: "/images/elevatr-homepage.jpg",
    gradientFrom: "#ff6a00",
    gradientTo: "#ee0979",
    liveUrl: "https://elevatr-0.netlify.app/",
    stack: ["Lovable", "React", "Tailwind CSS", "Netlify"],
    metrics: [
      { value: "5", label: "Peaks to Summit", sub: "Structured goal hierarchy" },
      { value: "100%", label: "Mobile-first UI", sub: "Optimised for on-the-go tracking" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "Traditional habit trackers feel like chore lists. I wanted something that made progress feel epic — like actually climbing a mountain.",
      },
      {
        heading: "The Solution",
        body: "Elevatr maps your habits to a mountain-shaped progress chart. As you check off steps, your trail climbs the ridge. The orange accent colour was chosen to evoke energy and determination.",
      },
      {
        heading: "What I Learned",
        body: "Building Elevatr taught me how to structure hierarchical goal data and render custom SVG-style charts inside a mobile-first layout.",
      },
    ],
  },
  "flow-state": {
    name: "Flow-State",
    tagline: "Turn anything into study materials, instantly",
    description:
      "Flow-State is an AI-powered study tool that converts lectures, documents, and videos into flashcards, notes, and quizzes — all powered by Google Gemini and hosted on v0.",
    image: "/images/flow-state-homepage.jpg",
    extraImages: ["/images/flow-state-login.jpg"],
    gradientFrom: "#7f00ff",
    gradientTo: "#00c9ff",
    liveUrl: "https://v0-flow-hass.vercel.app/",
    stack: ["v0", "Next.js", "Google Gemini API", "Tailwind CSS"],
    metrics: [
      { value: "3", label: "Content Types", sub: "Notes, flashcards, quizzes" },
      { value: "0", label: "Setup Required", sub: "Upload and go" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "Studying from raw lecture recordings or dense PDFs is slow. I wanted a tool that would do the heavy lifting and surface the key concepts immediately.",
      },
      {
        heading: "The Solution",
        body: "Flow-State uses Google Gemini to parse uploaded content and generate structured study materials. The purple-to-teal gradient was chosen to feel creative and modern.",
      },
      {
        heading: "What I Learned",
        body: "Integrating the Gemini API taught me how to handle streaming responses, structure prompt engineering for consistent output, and build a clean file-upload UX.",
      },
    ],
  },
  waveform: {
    name: "Waveform",
    tagline: "Discover your next favourite track — free",
    description:
      "Waveform is a free music player and discovery app with genre-based browsing, a search bar, and a clean bottom-nav layout that feels right at home on any mobile device.",
    image: "/images/waveform-homepage.jpg",
    gradientFrom: "#1ed760",
    gradientTo: "#006e3c",
    liveUrl: "http://muse123.netlify.app/",
    stack: ["Lovable", "React", "Tailwind CSS", "Netlify"],
    metrics: [
      { value: "9", label: "Genres", sub: "Pop, Hip-Hop, Lo-fi, Rock, and more" },
      { value: "5", label: "Nav Sections", sub: "Home, Search, Library, Liked, Settings" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "Most music apps are bloated or locked behind a paywall. I wanted to build a stripped-back alternative focused purely on discovery.",
      },
      {
        heading: "The Solution",
        body: "Waveform prioritises browsing by genre and a fast search experience. The dark UI with green accents takes obvious inspiration from Spotify but keeps the interface minimal.",
      },
      {
        heading: "What I Learned",
        body: "This project was my first time architecting a multi-tab mobile-style app in React, handling bottom navigation state without a router library.",
      },
    ],
  },
  ptrn: {
    name: "Ptrn",
    tagline: "Build better routines, time-blocked and colourful",
    description:
      "Ptrn is a habit tracker that organises your daily tasks into Morning, Afternoon, and Evening blocks, each with distinct colour accents, emoji icons, and a global progress bar.",
    image: "/images/ptrn-homepage.jpg",
    gradientFrom: "#43e97b",
    gradientTo: "#38f9d7",
    liveUrl: "https://sean-oldfield-web.github.io/",
    stack: ["Lovable", "React", "Tailwind CSS", "GitHub Pages"],
    metrics: [
      { value: "3", label: "Time Blocks", sub: "Morning, Afternoon, Evening" },
      { value: "6", label: "Default Habits", sub: "Fully customisable" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "I wanted a habit tracker that felt alive — colour-coded periods of the day, emoji-backed tasks, and a visible overall progress bar to stay motivated.",
      },
      {
        heading: "The Solution",
        body: "Ptrn groups habits by time of day with a left-side colour bar indicating the block. A global slider at the bottom fills as you complete tasks across all groups.",
      },
      {
        heading: "What I Learned",
        body: "Ptrn deepened my understanding of component-level state management in React and taught me how to deploy a static app to GitHub Pages with a custom domain.",
      },
    ],
  },
};

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = projects[slug];
  if (!project) notFound();

  return (
    <div className="dark min-h-screen bg-zinc-950 text-white">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        <div
          className="rounded-2xl p-px"
          style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
        >
          <div className="rounded-2xl bg-zinc-950 p-8 md:p-14 flex flex-col md:flex-row gap-10 items-start">
            {/* Screenshot(s) */}
            <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                width={300}
                height={540}
                className="rounded-xl object-cover object-top w-full shadow-2xl ring-1 ring-zinc-800"
              />
              {project.extraImages?.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`${project.name} additional screenshot ${i + 2}`}
                  width={300}
                  height={540}
                  className="rounded-xl object-cover object-top w-full shadow-2xl ring-1 ring-zinc-800"
                />
              ))}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
                style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
              >
                {project.name}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight">
                {project.tagline}
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed">{project.description}</p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.stack.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {s}
                  </span>
                ))}
              </div>

              {/* Live link */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-black rounded-lg px-5 py-2.5 w-fit transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
                >
                  View Live <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold text-zinc-300 mb-6 uppercase tracking-widest text-sm">By the numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.metrics.map((m, i) => (
            <MetricStat key={i} value={m.value} label={m.label} sub={m.sub} />
          ))}
        </div>
      </section>

      {/* Case-study sections */}
      <section className="max-w-5xl mx-auto px-6 pb-24 flex flex-col gap-12">
        {project.sections.map((s, i) => (
          <div
            key={i}
            className="border-l-4 pl-6"
            style={{ borderColor: project.gradientFrom }}
          >
            <h3 className="text-xl font-semibold mb-2">{s.heading}</h3>
            <p className="text-zinc-400 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Sean Oldfield
      </footer>
    </div>
  );
}
