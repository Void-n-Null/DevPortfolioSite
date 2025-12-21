"use client";

import React from "react";

interface ProjectDotIndicatorProps {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
  isPlaying: boolean;
  progressRef: React.RefObject<HTMLDivElement | null>;
}

export function ProjectDotIndicator({ 
  count, 
  current, 
  onDotClick, 
  isPlaying, 
  progressRef 
}: ProjectDotIndicatorProps) {
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

