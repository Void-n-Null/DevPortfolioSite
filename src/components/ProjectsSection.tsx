"use client";

import { Github, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/data/projects_data";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectDotIndicator } from "./projects/ProjectDotIndicator";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";

// ============================================================================
// CAROUSEL CONFIGURATION
// ============================================================================
const AUTOPLAY_DELAY = 6000;

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
  
  const {
    isPlaying,
    isAutoplayEnabled,
    toggleAutoplay,
    pause,
    resume,
    progressRef,
  } = useCarouselAutoplay(emblaApi, { delay: AUTOPLAY_DELAY });

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
    
    // Initialize state
    handleSelect();
    
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

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
                      onHoverStart={pause}
                      onHoverEnd={resume}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
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
          <ProjectDotIndicator 
            count={projects.length}
            current={selectedIndex}
            onDotClick={scrollTo}
            isPlaying={isPlaying}
            progressRef={progressRef}
          />
          
          <button
            onClick={toggleAutoplay}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isAutoplayEnabled ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoplayEnabled ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="hidden md:block mt-4 text-center text-xs text-muted-foreground/50">
          Use arrow keys to navigate • Space to toggle autoplay
        </p>
      </div>
    </section>
  );
}
