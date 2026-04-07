"use client";

import { useRef, useState } from "react";
import { CircularGallery, GalleryItem } from "@/components/ui/circular-gallery";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import CaseStudies, { CaseStudy } from "@/components/ui/case-studies";
import { ProjectShowcase, ShowcaseProject } from "@/components/ui/project-showcase";
import {
  Code2,
  Palette,
  Smartphone,
  BrainCircuit,
  GitBranch,
  Layers,
} from "lucide-react";

// ============================================================
// PROJECT DATA - Edit your projects here!
// ============================================================
// Each project needs:
// - common: Project name
// - binomial: Tech stack or tagline
// - photo.url: Unsplash image URL
// - photo.text: Alt text for accessibility
// - photo.by: Photographer credit
// - photo.pos: (optional) Object position for image cropping
// ============================================================

const projectData: GalleryItem[] = [
  // ─────────────────────────────────────────────────────────
  // YOUR PROJECTS - Edit these!
  // ─────────────────────────────────────────────────────────
  {
    common: "Waveform - Free Music Player",
    binomial: "Coded on Lovable - Hosted through Netlify",
    photo: {
      url: "/images/waveform-homepage.jpg",
      text: "WaveForm app showing the Discover page with genre filters and AI-powered music recommendations",
      pos: "center top",
      by: "WaveForm Homepage",
    },
  },
  {
    common: "Ptrn",
    binomial: "Coded on Lovable - Hosted through Github Pages",
    photo: {
      url: "/images/ptrn-homepage.jpg",
      text: "Ptrn habit tracker app homepage showing morning, afternoon and evening habits",
      pos: "center top",
      by: "Ptrn Homepage",
    },
  },
  {
    common: "Elevatr",
    binomial: "Coded on Lovable - Hosted through Netlify",
    photo: {
      url: "/images/elevatr-homepage.jpg",
      text: "Elevatr app homepage showing a mountain goal tracker with peak progress chart",
      pos: "center top",
      by: "Elevatr Homepage",
    },
  },
  {
    common: "Flow-State",
    binomial: "Coded + Hosted on v0  - Gemini Intergration",
    photo: {
      url: "/images/flow-state-homepage.jpg",
      text: "Flow-State app homepage showing AI-powered study materials generator with flashcards and quizzes",
      pos: "center top",
      by: "Flow-State Homepage",
    },
  },

  // ─────────────────────────────────────────────────────────
  // PLACEHOLDER PROJECTS - Replace these with your own!
  // ─────────────────────────────────────────────────────────
  {
    common: "Project Name",
    binomial: "Stack · Goes · Here",
    photo: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
      text: "Code on a computer screen",
      pos: "center",
      by: "Arnold Francisca",
    },
  },
  {
    common: "Project Name",
    binomial: "Stack · Goes · Here",
    photo: {
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
      text: "Laptop with code editor open",
      pos: "center",
      by: "Clement Helardot",
    },
  },
  {
    common: "Project Name",
    binomial: "Stack · Goes · Here",
    photo: {
      url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=900&auto=format&fit=crop&q=80",
      text: "GitHub interface on screen",
      pos: "center",
      by: "Roman Synkevych",
    },
  },
  {
    common: "Project Name",
    binomial: "Stack · Goes · Here",
    photo: {
      url: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=900&auto=format&fit=crop&q=80",
      text: "Developer typing on keyboard with code",
      pos: "center",
      by: "Arian Darvishi",
    },
  },
];

type ProjectMenuItem = {
  id: string;
  name: string;
  stack: string;
  summary: string;
  role: string;
  status: string;
  primaryPlaceholder: string;
  secondaryPlaceholder: string;
};

const projectMenuData: ProjectMenuItem[] = [
  {
    id: "elevatr",
    name: "Elevatr",
    stack: "Lovable · React · Tailwind CSS · Netlify",
    summary:
      "Gamify your goals with mountain-climbing metaphors. Track habits and watch your peak progress climb.",
    role: "Frontend development, UX flow, and deployment setup",
    status: "Live",
    primaryPlaceholder: "Elevatr homepage screenshot placeholder",
    secondaryPlaceholder: "Elevatr progress/feature screenshot placeholder",
  },
  {
    id: "flow-state",
    name: "Flow-State",
    stack: "v0 · Next.js · Google Gemini API · Tailwind CSS",
    summary:
      "Upload lectures or documents and get AI-generated flashcards, notes, and quizzes powered by Gemini.",
    role: "AI integration, prompt design, and app architecture",
    status: "Live",
    primaryPlaceholder: "Flow-State homepage screenshot placeholder",
    secondaryPlaceholder: "Flow-State login/feature screenshot placeholder",
  },
  {
    id: "waveform",
    name: "Waveform",
    stack: "Lovable · React · Tailwind CSS · Netlify",
    summary:
      "A free music discovery app with genre filters, search, and a clean mobile-first interface.",
    role: "Mobile-first UI design and React implementation",
    status: "Live",
    primaryPlaceholder: "Waveform homepage screenshot placeholder",
    secondaryPlaceholder: "Waveform browse/player screenshot placeholder",
  },
  {
    id: "ptrn",
    name: "Ptrn",
    stack: "Lovable · React · Tailwind CSS · GitHub Pages",
    summary:
      "Build better routines with time-blocked morning, afternoon, and evening habit groups.",
    role: "Product concept, habit UX, and deployment",
    status: "Live",
    primaryPlaceholder: "Ptrn homepage screenshot placeholder",
    secondaryPlaceholder: "Ptrn habits/progress screenshot placeholder",
  },
];

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "elevatr",
    title: "Elevatr",
    description: "Habit-tracking app concept. Click to open the full project menu.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "flow-state",
    title: "Flow-State",
    description: "AI-assisted study app concept. Click to open the full project menu.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "waveform",
    title: "Waveform",
    description: "Music app concept. Click to open the full project menu.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "ptrn",
    title: "Ptrn",
    description: "Daily routine app concept. Click to open the full project menu.",
    year: "2026",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
  },
];

const caseStudiesByProject: Record<string, CaseStudy> = {
  elevatr: {
    id: "elevatr",
    quote:
      "Elevatr gamifies personal growth by framing goals as peaks to summit. Habits become steps up the mountain, and progress is visualized in a clear mountain-chart interface.",
    name: "Elevatr",
    role: "Habit tracking app · Built and shipped by Sean Oldfield",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=80",
    icon: "monitor",
    metrics: [
      { value: "5", label: "Peaks to Summit", sub: "Structured goal hierarchy" },
      { value: "100%", label: "Mobile-first UI", sub: "Optimized for on-the-go tracking" },
    ],
  },
  "flow-state": {
    id: "flow-state",
    quote:
      "Flow-State converts uploaded lectures, documents, and videos into flashcards, notes, and quizzes using Gemini. It is designed to remove study setup friction and speed up revision.",
    name: "Flow-State",
    role: "AI study tool · Built and shipped by Sean Oldfield",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&auto=format&fit=crop&q=80",
    icon: "dashboard",
    metrics: [
      { value: "3", label: "Content Types", sub: "Notes, flashcards, quizzes" },
      { value: "0", label: "Setup Required", sub: "Upload and go" },
    ],
  },
  waveform: {
    id: "waveform",
    quote:
      "Waveform focuses on fast music discovery through genre browsing and search. The UI is intentionally minimal and mobile-first for a smooth, app-like listening flow.",
    name: "Waveform",
    role: "Music discovery app · Built and shipped by Sean Oldfield",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
    icon: "users",
    metrics: [
      { value: "9", label: "Genres", sub: "Pop, Hip-Hop, Lo-fi, Rock, and more" },
      { value: "5", label: "Nav Sections", sub: "Home, Search, Library, Liked, Settings" },
    ],
  },
  ptrn: {
    id: "ptrn",
    quote:
      "Ptrn organizes habits into Morning, Afternoon, and Evening blocks with clear visual grouping. The design keeps routine planning simple while still feeling energetic and motivating.",
    name: "Ptrn",
    role: "Habit routine app · Built and shipped by Sean Oldfield",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&auto=format&fit=crop&q=80",
    icon: "monitor",
    metrics: [
      { value: "3", label: "Time Blocks", sub: "Morning, Afternoon, Evening" },
      { value: "6", label: "Default Habits", sub: "Fully customizable" },
    ],
  },
};

const skillItems: BentoItem[] = [
  {
    title: "Frontend Development",
    meta: "React · Next.js",
    description:
      "Built four full web apps using React and Next.js — handling routing, state, server components, and API routes. Comfortable building everything from landing pages to multi-page SPAs.",
    icon: <Code2 className="w-4 h-4 text-blue-400" />,
    status: "Core Skill",
    tags: ["React", "Next.js", "TypeScript"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "UI / Styling",
    meta: "Tailwind · shadcn/ui",
    description:
      "Designed all project UIs with Tailwind CSS and shadcn/ui. Fluent in utility-first styling, dark mode theming, responsive layouts, and custom design tokens via globals.css.",
    icon: <Palette className="w-4 h-4 text-pink-400" />,
    status: "Core Skill",
    tags: ["Tailwind CSS", "shadcn/ui", "CSS"],
  },
  {
    title: "Mobile-First Design",
    meta: "Lovable · Netlify",
    description:
      "Waveform and Ptrn were built and shipped as mobile-first apps using Lovable, with real users in mind. Focused on touch targets, scroll behaviour, and clean navigation patterns.",
    icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
    status: "Applied",
    tags: ["Responsive", "Mobile UX"],
  },
  {
    title: "AI Integration",
    meta: "Gemini · v0",
    description:
      "Integrated Google Gemini into Flow-State to auto-generate flashcards, notes, and quizzes from uploaded content. Experienced with AI SDK patterns, prompt engineering, and streaming responses.",
    icon: <BrainCircuit className="w-4 h-4 text-purple-400" />,
    status: "Applied",
    tags: ["Gemini API", "AI SDK", "Prompting"],
    colSpan: 2,
  },
  {
    title: "Version Control",
    meta: "Git · GitHub",
    description:
      "All projects are version-controlled and hosted on GitHub. Familiar with branching, commits, pull requests, and GitHub Pages deployment.",
    icon: <GitBranch className="w-4 h-4 text-orange-400" />,
    status: "Active",
    tags: ["Git", "GitHub Pages"],
  },
  {
    title: "Full-Stack Thinking",
    meta: "Vercel · Netlify",
    description:
      "Shipped apps across Vercel, Netlify, and GitHub Pages. Understands the deployment pipeline — from local dev to live preview to production — and how to wire up environment variables, APIs, and hosting configs.",
    icon: <Layers className="w-4 h-4 text-sky-400" />,
    status: "Growing",
    tags: ["Deployment", "Vercel", "Netlify"],
    colSpan: 2,
  },
];

export default function PortfolioPage() {
  const galleryRef = useRef<HTMLElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const [activeProjectId, setActiveProjectId] = useState("elevatr");
  const activeProject = projectMenuData.find((project) => project.id === activeProjectId) ?? projectMenuData[0];
  const activeCaseStudy = caseStudiesByProject[activeProjectId] ?? caseStudiesByProject.elevatr;

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openProjectCaseStudy = (project: ShowcaseProject) => {
    setActiveProjectId(project.id);
    caseStudiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <WebGLShader />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Sean Oldfield
              </span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium">
              Vibe Coder & Web App Developer
            </p>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Y11 developer passionate about crafting intuitive web experiences.
              I turn ideas into interactive realities, one line of code at a
              time. Currently vibing with React, Next.js, and modern CSS to
              build apps that feel as good as they look.
            </p>
            <div className="mt-10 flex justify-center">
              <LiquidButton
                className="text-white border border-zinc-600 rounded-full"
                onClick={scrollToGallery}
              >
                Let&apos;s Go
              </LiquidButton>
            </div>
          </div>
        </section>

        {/* Projects Gallery Section — height scales with item count so every card fully rotates into view */}
        <section ref={galleryRef}>
        <div className="w-full" style={{ height: `${(projectData.length + 6) * 100}vh` }}>
          <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
            {/* Section Header */}
            <div className="text-center mb-8 absolute top-12 md:top-16 z-10 px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                My Projects
              </h2>
              <p className="text-muted-foreground mt-2">Scroll to explore</p>
            </div>

            {/* Circular Gallery */}
            <div className="w-full h-full">
              <CircularGallery items={projectData} />
            </div>
          </div>
        </div>
        </section>

        {/* Project Showcase */}
        <section className="w-full bg-background py-12 px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Selected Work
            </h2>
            <p className="text-muted-foreground mt-2">
              Hover to preview, click to open the full case study menu
            </p>
          </div>
          <ProjectShowcase projects={showcaseProjects} onProjectClick={openProjectCaseStudy} />
        </section>

        {/* Case Study Menu */}
        <section ref={caseStudiesRef}>
          <CaseStudies
            studies={[activeCaseStudy]}
            title={`${activeProject.name} Case Study`}
            subtitle={`${activeProject.summary} (${activeProject.status})`}
          />
        </section>

        {/* Skills Bento Section */}
        <section className="w-full bg-background py-12 px-4">
          <div className="text-center mb-6 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Skills &amp; Tools
            </h2>
            <p className="text-muted-foreground mt-2">
              Technologies and techniques picked up across every build
            </p>
          </div>
          <BentoGrid items={skillItems} />
        </section>

        {/* Footer */}
        <footer className="relative bg-zinc-950 border-t border-border py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-semibold text-foreground">
              Sean Oldfield
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Y11 Vibe Coder & Web App Developer
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <a
                href="https://github.com/Sean-Oldfield-Web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} Sean Oldfield. vibecoding
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
