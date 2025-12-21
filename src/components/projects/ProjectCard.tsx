"use client";

import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import type { Project } from "@/data/projects_data";

interface ProjectCardProps {
  project: Project;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function ProjectCard({ project, onHoverStart, onHoverEnd }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);

  // Use the same container for both ref and glow positioning
  useMouseGlow(glowBorderRef, containerRef, { radius: 300 });

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    shipped: { bg: "bg-primary/20", text: "text-primary", label: "Shipped" },
    building: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Building" },
    contribution: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Contribution" },
  };

  const status = statusColors[project.status || "shipped"];

  return (
    <div
      className="group relative h-full"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Outer container - full bleed on mobile, contained on desktop */}
      <div ref={containerRef} className="relative h-full -mx-4 sm:mx-0">
        {/* Base border - visible on larger screens */}
        <div className="hidden sm:block absolute inset-0 z-10 rounded-2xl sm:rounded-3xl border border-border/20 pointer-events-none" />
        
        {/* Glowing border - masked by mouse position (desktop only) */}
        <div 
          ref={glowBorderRef}
          className="hidden sm:block absolute inset-0 z-10 rounded-2xl sm:rounded-3xl border-2 border-blue-500 pointer-events-none"
          style={{
            maskImage: "radial-gradient(300px circle at -1000px -1000px, black, transparent)",
            WebkitMaskImage: "radial-gradient(300px circle at -1000px -1000px, black, transparent)",
          }}
        />

        {/* Card content container */}
        <div className="relative h-full overflow-hidden sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40">
          {/* Project image background */}
          {project.image ? (
            <div className="absolute inset-0 overflow-hidden">
              {/* Image layer */}
              <div
                className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${project.image.src})`,
                  backgroundSize: `${(project.image.scale ?? 1) * 100}%`,
                  backgroundPosition: `${50 + (project.image.offsetX ?? 0)}% ${50 + (project.image.offsetY ?? 0)}%`,
                  backgroundRepeat: "no-repeat",
                  opacity: project.image.opacity ?? 0.3,
                }}
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
          )}

          {/* Content */}
          <div className="relative h-full flex flex-col p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Top row: Status badge + External link */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <span
                className={`
                  inline-flex items-center gap-1.5
                  px-3 py-1 sm:px-4 sm:py-1.5
                  text-[10px] sm:text-xs font-mono uppercase tracking-widest
                  rounded-full
                  ${status.bg} ${status.text}
                  backdrop-blur-sm
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {status.label}
              </span>
              
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-2 text-muted-foreground/50 hover:text-primary 
                  transition-all duration-300 hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* Title - bigger and bolder */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 
              bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text
              group-hover:from-primary group-hover:via-primary group-hover:to-primary/80
              transition-all duration-500"
            >
              {project.title}
            </h3>

            {/* Description - use longDescription on larger screens */}
            <p className={`
              text-sm sm:text-base md:text-lg leading-relaxed
              ${project.textColor || "text-muted-foreground"}
              mb-4 sm:mb-6 md:mb-8
              max-w-2xl
            `}>
              <span className="sm:hidden">{project.description}</span>
              <span className="hidden sm:inline">{project.longDescription || project.description}</span>
            </p>

            {/* Highlights - displayed as key metrics */}
            {project.highlights && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8 mb-4 sm:mb-6 md:mb-8">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2"
                  >
                    <span className="text-primary text-lg sm:text-xl font-bold">→</span>
                    <span className="text-sm sm:text-base text-foreground/90 font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Spacer to push tech stack to bottom */}
            <div className="flex-grow" />

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-auto">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5
                    px-3 py-1.5 sm:px-4 sm:py-2
                    text-[11px] sm:text-xs font-mono tracking-wide
                    rounded-lg
                    bg-gradient-to-br from-muted/80 to-muted/40
                    text-foreground/70
                    border border-border/30
                    group-hover:border-primary/30 group-hover:text-foreground/90
                    transition-all duration-300
                    backdrop-blur-sm
                    shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons - mobile friendly tap targets */}
            <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 border-t border-border/20">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2
                  px-4 py-2.5 sm:px-6 sm:py-3
                  text-sm sm:text-base font-medium
                  rounded-xl
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  transition-all duration-300
                  hover:scale-[1.02] active:scale-[0.98]"
              >
                View Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
              
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center
                    p-2.5 sm:p-3
                    rounded-xl
                    bg-muted/60 text-muted-foreground
                    hover:bg-muted hover:text-foreground
                    transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

