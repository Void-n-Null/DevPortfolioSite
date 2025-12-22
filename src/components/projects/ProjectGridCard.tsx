"use client";

import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import type { Project } from "@/data/projects_data";

interface ProjectGridCardProps {
  project: Project;
  size: "large" | "medium" | "small";
}

export function ProjectGridCard({ project, size }: ProjectGridCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);

  useMouseGlow(glowBorderRef, containerRef, { radius: 250 });

  const statusColors: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    shipped: { bg: "bg-primary/15", text: "text-primary", dot: "bg-primary", label: "Shipped" },
    building: { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400", label: "Building" },
    contribution: { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400", label: "Contribution" },
  };

  const status = statusColors[project.status || "shipped"];

  // Adaptive sizing based on card size
  const sizeClasses = {
    large: {
      title: "text-2xl sm:text-3xl md:text-4xl",
      description: "text-sm sm:text-base",
      padding: "p-5 sm:p-6 md:p-8",
      minHeight: "min-h-[340px] sm:min-h-[380px] md:min-h-[420px]",
    },
    medium: {
      title: "text-xl sm:text-2xl md:text-3xl",
      description: "text-sm",
      padding: "p-4 sm:p-5 md:p-6",
      minHeight: "min-h-[280px] sm:min-h-[320px] md:min-h-[360px]",
    },
    small: {
      title: "text-lg sm:text-xl md:text-2xl",
      description: "text-xs sm:text-sm",
      padding: "p-4 sm:p-5",
      minHeight: "min-h-[240px] sm:min-h-[280px]",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      ref={containerRef}
      className={`group relative ${classes.minHeight} h-full`}
    >
      {/* Base border */}
      <div className="absolute inset-0 z-10 rounded-2xl border border-border/30 pointer-events-none 
        group-hover:border-primary/20 transition-colors duration-500" />
      
      {/* Glowing border - follows mouse */}
      <div 
        ref={glowBorderRef}
        className="absolute inset-0 z-10 rounded-2xl border-2 border-primary/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          maskImage: "radial-gradient(250px circle at -1000px -1000px, black, transparent)",
          WebkitMaskImage: "radial-gradient(250px circle at -1000px -1000px, black, transparent)",
        }}
      />

      {/* Card content */}
      <div className={`
        relative h-full overflow-hidden rounded-2xl
        bg-gradient-to-br from-card/90 via-card/70 to-card/50
        ${classes.padding}
        flex flex-col
        transition-all duration-500
        group-hover:from-card via-card/80 group-hover:to-card/60
      `}>
        {/* Background image */}
        {project.image && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="absolute inset-0 transition-all duration-700 ease-out 
                group-hover:scale-110 group-hover:opacity-50"
              style={{
                backgroundImage: `url(${project.image.src})`,
                backgroundSize: `${(project.image.scale ?? 1) * 100}%`,
                backgroundPosition: `${50 + (project.image.offsetX ?? 0)}% ${50 + (project.image.offsetY ?? 0)}%`,
                backgroundRepeat: "no-repeat",
                opacity: (project.image.opacity ?? 0.3) * 0.7,
              }}
            />
            {/* Stronger gradient overlay for grid cards */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-card/60" />
          </div>
        )}

        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Status + Link */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <span
              className={`
                inline-flex items-center gap-1.5
                px-2.5 py-1 sm:px-3 sm:py-1
                text-[9px] sm:text-[10px] font-mono uppercase tracking-widest
                rounded-full
                ${status.bg} ${status.text}
                backdrop-blur-sm
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
              {status.label}
            </span>
            
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 -m-1 text-muted-foreground/40 hover:text-primary 
                transition-all duration-300 hover:scale-110 rounded-lg hover:bg-primary/10"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {/* Title */}
          <h3 className={`
            ${classes.title} font-medium font-mono mb-2 sm:mb-3 leading-tight
            text-foreground
            group-hover:text-primary
            transition-colors duration-300
          `}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={`
            ${classes.description} leading-relaxed
            ${project.textColor || "text-muted-foreground"}
            mb-3 sm:mb-4
            line-clamp-3
          `}>
            {project.description}
          </p>

          {/* Highlights - only on larger cards */}
          {project.highlights && size !== "small" && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3 sm:mb-4">
              {project.highlights.slice(0, size === "large" ? 3 : 2).map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-1.5 text-xs text-foreground/80"
                >
                  <span className="text-primary font-bold">→</span>
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.tech.slice(0, size === "small" ? 3 : 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center
                  px-2 py-1 sm:px-2.5 sm:py-1
                  text-[10px] sm:text-[11px] font-mono tracking-wide
                  rounded-md
                  bg-muted/60 text-foreground/60
                  border border-border/20
                  group-hover:border-primary/20 group-hover:text-foreground/80
                  transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > (size === "small" ? 3 : 4) && (
              <span className="inline-flex items-center px-2 py-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground/50">
                +{project.tech.length - (size === "small" ? 3 : 4)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-border/20">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5
                px-3 py-2 sm:px-4 sm:py-2.5
                text-xs sm:text-sm font-medium
                rounded-xl
                bg-primary/10 text-primary
                hover:bg-primary hover:text-primary-foreground
                transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]"
            >
              View
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center
                  p-2 sm:p-2.5
                  rounded-xl
                  bg-muted/40 text-muted-foreground
                  hover:bg-muted hover:text-foreground
                  transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

