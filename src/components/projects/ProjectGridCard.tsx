"use client";

import { useRef } from "react";
import { Github, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import type { Project } from "@/data/projects_data";
import { SimpleIcon } from "@/components/ui/SimpleIcon";

interface ProjectGridCardProps {
  project: Project;
  size: "large" | "medium" | "small";
}

export function ProjectGridCard({ project, size }: ProjectGridCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);
  const glowBgRef = useRef<HTMLDivElement>(null);

  const borderRadius = 250;
  const bgRadius = 800;

  useMouseGlow(glowBorderRef, containerRef, { radius: borderRadius });
  useMouseGlow(glowBgRef, containerRef, { radius: bgRadius });

  const statusColors: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    shipped: { bg: "bg-primary/15", text: "text-primary", dot: "bg-primary", label: "Shipped" },
    building: { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400", label: "Building" },
    contribution: { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400", label: "Contribution" },
  };

  const status = statusColors[project.status || "shipped"];
  const isAutoGPT = project.id === "autogpt";
  const detailHref = isAutoGPT ? "/#autogpt" : `/projects/${project.id}`;

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
        className="absolute inset-0 z-10 rounded-2xl border-2 border-blue-500/80 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          maskImage: `radial-gradient(${borderRadius}px circle at -1000px -1000px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(${borderRadius}px circle at -1000px -1000px, black, transparent)`,
        }}
      />

      {/* Card content */}
      <div className={`
        relative h-full overflow-hidden rounded-2xl
        bg-card/40 backdrop-blur-sm
        ${classes.padding}
        flex flex-col
        transition-all duration-500
        group-hover:bg-card/60
      `}>
        {/* Background glow - follows mouse */}
        <div 
          ref={glowBgRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-blue-600/35"
          style={{
            maskImage: `radial-gradient(${bgRadius}px circle at -1000px -1000px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(${bgRadius}px circle at -1000px -1000px, black, transparent)`,
          }}
        />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header: Status badge */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
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
          </div>

          {/* Visual "View More" Card */}
          {project.image && (
            <Link 
              href={detailHref}
              className="group/more relative w-full aspect-[2/1] mb-6 overflow-hidden rounded-xl border border-border/40 bg-muted/20 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div
                className="w-full h-full transition-all duration-700 group-hover/more:scale-[1.05]"
                style={{
                  backgroundImage: `url(${project.image.src})`,
                  backgroundSize: `${(project.image.scale ?? 1) * 100}%`,
                  backgroundPosition: `${50 + (project.image.offsetX ?? 0)}% ${50 + (project.image.offsetY ?? 0)}%`,
                  backgroundRepeat: "no-repeat",
                  opacity: project.image.opacity ?? 1,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover/more:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/more:opacity-100 transition-all duration-500 translate-y-2 group-hover/more:translate-y-0">
                <div className="px-4 py-2 bg-primary text-primary-foreground font-mono text-xs rounded-lg flex items-center gap-2 shadow-xl">
                  {isAutoGPT ? "Read My Story" : "View Case Study"} <BookOpen className="w-3 h-3" />
                </div>
              </div>
            </Link>
          )}

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

          {/* Highlights - cleaned up without arrows */}
          {project.highlights && size !== "small" && (
            <ul className="space-y-1 mb-3 sm:mb-4">
              {project.highlights.slice(0, size === "large" ? 3 : 2).map((highlight) => (
                <li
                  key={highlight}
                  className="text-xs text-foreground/80 font-medium pl-3 border-l-2 border-primary/40"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.tech.slice(0, size === "small" ? 3 : 4).map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5
                  px-2 py-1 sm:px-2.5 sm:py-1
                  text-[10px] sm:text-[11px] font-mono tracking-wide
                  rounded-md
                  bg-muted/60 text-foreground/60
                  border border-border/20
                  group-hover:border-primary/20 group-hover:text-foreground/80
                  transition-all duration-300"
              >
                {tech.icon && (
                  <div className="text-white/40 group-hover:text-white/70 transition-colors">
                    {tech.icon.kind === "simple" ? (
                      <SimpleIcon icon={tech.icon.icon} className="w-3 h-3" />
                    ) : (
                      <Image src={tech.icon.src} alt={tech.icon.alt} width={12} height={12} className="w-3 h-3 object-contain brightness-0 invert opacity-40 group-hover:opacity-70 transition-opacity" />
                    )}
                  </div>
                )}
                {tech.name}
              </span>
            ))}
            {project.tech.length > (size === "small" ? 3 : 4) && (
              <span className="inline-flex items-center px-2 py-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground/50">
                +{project.tech.length - (size === "small" ? 3 : 4)}
              </span>
            )}
          </div>

          {/* Actions - simplified to 2 distinct buttons or one if redundant */}
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
              {project.link.includes("github.com") && (!project.github || project.github === project.link) ? (
                <>
                  <Github className="w-4 h-4" />
                  View Code
                </>
              ) : (
                <>
                  {project.github && project.github !== project.link ? "View Site" : "View Project"}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </a>
            
            {project.github && project.github !== project.link && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5
                  px-3 py-2 sm:px-4 sm:py-2.5
                  text-xs sm:text-sm font-medium
                  rounded-xl
                  bg-muted/40 text-muted-foreground
                  hover:bg-muted hover:text-foreground
                  transition-all duration-300
                  hover:scale-[1.02] active:scale-[0.98]"
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
                <span className="">View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

