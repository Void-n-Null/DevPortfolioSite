"use client";

import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectImage {
  src: string;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}

const projects = [

  {
    title: "Godot GOAP Demo",
    description:
      "High-performance goal-oriented action planner in Godot. Custom ECS, custom sprite renderer that bypasses the scene tree, backward dependency pruning. 10k+ plans/sec.",
    tech: ["C#", "Godot", "Jetbrains Rider"],
    link: "https://github.com/Void-n-Null/godot-goap-demo",

    featured: true,
    text_color: "text-cyan-200 font-medium",
    image: {
      src: "/goap_demo_example.png",
      scale: 1.4,
      offsetX: -50,
      offsetY: 0,
      opacity: 0.3,
    } as ProjectImage,
  },
  {
    title: "Rebang",
    description:
      "A simple but powerful search redirector using bangs. Optimized a 13,000 bang to be ~43% smaller and built a custom bang creation tool. ",
    tech: ["TypeScript", "React", "Tailwind", "Shadcn"],
    link: "https://github.com/Void-n-Null/rebang",

    featured: true,
    image: {
      src: "/rebang_example.png",
      scale: 1.7,
      offsetX: -22,
      offsetY: -4,
      opacity: 0.5,
    } as ProjectImage,
  },
  {
    title: "AutoGPT",
    description:
      "Contributed to the development of AutoGPT, a project that was one of the first to use LLMs for agentic workflows. Worked directly with Toran Bruce Richards on agent architecture before agentic AI was a thing.",
    tech: ["Python", "Early Models (GPT 3.5, GPT 4)", "Prompt Engineering"],
    link: "https://github.com/Significant-Gravitas/AutoGPT",

    featured: false,
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0] & { image?: ProjectImage };
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);

  useMouseGlow(glowBorderRef, cardRef, { radius: 250 });

  const typeColors: Record<string, string> = {
    contribution: "text-emerald-400",
    building: "text-amber-400",
    shipped: "text-primary",
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full"
    >
      {/* Base border */}
      <div className="absolute inset-0 rounded-2xl border border-border/10 pointer-events-none" />
      
      {/* Glowing border - masked by mouse position */}
      <div 
        ref={glowBorderRef}
        className="absolute inset-0 rounded-2xl border border-2 border-blue-primary-foreground pointer-events-none"
        style={{
          maskImage: "radial-gradient(250px circle at -1000px -1000px, black, transparent)",
          WebkitMaskImage: "radial-gradient(250px circle at -1000px -1000px, black, transparent)",
        }}
      />

      {/* Card background */}
      <div className="absolute inset-[1px] rounded-2xl pointer-events-none" />

      {/* Card content */}
      <div className="relative h-full overflow-hidden rounded-2xl">
        {/* Project image background or fallback */}
        {project.image ? (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
              style={{
                backgroundImage: `url(${project.image.src})`,
                backgroundSize: `${(project.image.scale ?? 1) * 100}%`,
                backgroundPosition: `${50 + (project.image.offsetX ?? 0)}% ${50 + (project.image.offsetY ?? 0)}%`,
                backgroundRepeat: "no-repeat",
                opacity: project.image.opacity ?? 1,
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 rounded-2xl bg-black/40" />
        )}

        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <span
              className={`
              text-xs font-mono uppercase tracking-widest
              text-muted-foreground
            `}
            >
              {project.featured ? "Featured" : "Other"}
            </span>
            <ExternalLink
              className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary 
              group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />
          </div>

          <h3
            className="text-2xl sm:text-3xl font-bold mb-4 
            group-hover:text-primary transition-colors duration-300"
          >
            {project.title}
          </h3>

          <p className={`${project.text_color || "text-muted-foreground"} leading-relaxed flex-grow mb-6`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-mono rounded-full 
                  bg-muted/50 text-muted-foreground
                  group-hover:bg-primary/10 group-hover:text-primary/80
                  transition-colors duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </a>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="py-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>


          </div>
          <a
            href="https://github.com/Void-n-Null"
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/2">
                  <div className="h-full p-2">
                    <ProjectCard project={project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
