"use client";

import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import useEmblaCarousel from "embla-carousel-react";
import { projects, type Project } from "@/data/projects_data";

// ============================================================================
// CAROUSEL CONFIGURATION
// ============================================================================
const AUTOPLAY_DELAY = 6000; // ms between auto-advances

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================
interface ProjectCardProps {
  project: Project;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function ProjectCard({ project, onHoverStart, onHoverEnd }: ProjectCardProps) {
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
          className="hidden sm:block absolute inset-0 z-10 rounded-2xl sm:rounded-3xl border-2 border-primary pointer-events-none"
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

// ============================================================================
// CAROUSEL DOT INDICATOR
// ============================================================================
interface DotIndicatorProps {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
  isPlaying: boolean;
  progressRef: React.RefObject<HTMLDivElement | null>;
}

function DotIndicator({ count, current, onDotClick, isPlaying, progressRef }: DotIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`
            relative overflow-hidden
            h-2 sm:h-2.5 rounded-full
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
            ${index === current 
              ? "w-8 sm:w-12 bg-primary/30" 
              : "w-2 sm:w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? "true" : "false"}
        >
          {/* Progress fill for current dot when autoplaying */}
          {index === current && isPlaying && (
            <div 
              ref={progressRef}
              className="absolute inset-y-0 left-0 bg-primary rounded-full"
              style={{ width: '0%', transition: 'none' }}
            />
          )}
          {index === current && !isPlaying && (
            <div className="absolute inset-0 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN PROJECTS SECTION
// ============================================================================
export function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Pause on hover/focus
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    } else if (e.key === " ") {
      e.preventDefault();
      toggleAutoplay();
    }
  }, [scrollPrev, scrollNext, toggleAutoplay]);

  // Stop autoplay timer
  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    // Pause the CSS animation
    if (progressRef.current) {
      const computedWidth = getComputedStyle(progressRef.current).width;
      progressRef.current.style.width = computedWidth;
      progressRef.current.style.transition = 'none';
    }
  }, []);

  // Start autoplay timer with CSS animation
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    
    // Use requestAnimationFrame to ensure the element exists
    requestAnimationFrame(() => {
      if (progressRef.current) {
        // Reset and animate
        progressRef.current.style.transition = 'none';
        progressRef.current.style.width = '0%';
        
        // Force reflow, then animate
        progressRef.current.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
        progressRef.current.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
        progressRef.current.style.width = '100%';
      }
    });
    
    autoplayTimeoutRef.current = setTimeout(() => {
      emblaApi?.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi, stopAutoplay]);

  // Setup embla listeners
  useEffect(() => {
    if (!emblaApi) return;
    
    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    
    // Initialize state - wrapped in setTimeout to avoid sync setState in effect
    const initTimeout = setTimeout(handleSelect, 0);
    
    return () => {
      clearTimeout(initTimeout);
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  // Manage autoplay
  useEffect(() => {
    if (isPlaying && !isPaused && emblaApi) {
      startAutoplay();
    } else {
      stopAutoplay();
      // Reset progress if not paused (i.e., autoplay was toggled off)
      if (!isPaused && progressRef.current) {
        progressRef.current.style.transition = 'none';
        progressRef.current.style.width = '0%';
      }
    }
    
    return stopAutoplay;
  }, [selectedIndex, isPlaying, isPaused, emblaApi, startAutoplay, stopAutoplay]);

  return (
    <section 
      id="work" 
      className="py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 sm:px-8 mb-6 sm:mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Projects</h2>
            <span className="text-sm text-muted-foreground font-mono">
              {selectedIndex + 1}/{projects.length}
            </span>
          </div>
          <a
            href="https://github.com/Void-n-Null"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Carousel */}
        <div 
          className="relative"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
        >
          {/* Embla viewport */}
          <div ref={emblaRef} className="overflow-hidden">
            <div 
              className="flex touch-pan-y"
              style={{ 
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="flex-none w-full min-w-0 px-4 sm:px-8"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                >
                  <div className="h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px]">
                    <ProjectCard 
                      project={project} 
                      onHoverStart={handleMouseEnter}
                      onHoverEnd={handleMouseLeave}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows - larger tap targets on mobile, positioned outside on desktop */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev && !emblaApi?.plugins()?.loop}
            className="absolute left-1 sm:left-2 md:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
              flex items-center justify-center
              rounded-full
              bg-background/80 sm:bg-muted/80 backdrop-blur-sm
              border border-border/50
              text-muted-foreground hover:text-foreground hover:bg-muted
              transition-all duration-300
              hover:scale-105 active:scale-95
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            disabled={!canScrollNext && !emblaApi?.plugins()?.loop}
            className="absolute right-1 sm:right-2 md:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
              flex items-center justify-center
              rounded-full
              bg-background/80 sm:bg-muted/80 backdrop-blur-sm
              border border-border/50
              text-muted-foreground hover:text-foreground hover:bg-muted
              transition-all duration-300
              hover:scale-105 active:scale-95
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Controls: Dots + Autoplay toggle */}
        <div className="mt-6 sm:mt-8 md:mt-10 px-4 sm:px-8 flex items-center justify-center gap-4 sm:gap-6">
          <DotIndicator 
            count={projects.length}
            current={selectedIndex}
            onDotClick={scrollTo}
            isPlaying={isPlaying && !isPaused}
            progressRef={progressRef}
          />
          
          <button
            onClick={toggleAutoplay}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Keyboard hint - hidden on mobile */}
        <p className="hidden md:block mt-4 text-center text-xs text-muted-foreground/50">
          Use arrow keys to navigate • Space to toggle autoplay
        </p>
      </div>
    </section>
  );
}
