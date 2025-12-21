"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UseEmblaCarouselType } from "embla-carousel-react";

interface AutoplayOptions {
  delay?: number;
}

export function useCarouselAutoplay(
  emblaApi: UseEmblaCarouselType[1],
  options: AutoplayOptions = {}
) {
  const { delay = 6000 } = options;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    // Pause the CSS animation
    if (progressRef.current) {
      const computedWidth = getComputedStyle(progressRef.current).width;
      progressRef.current.style.width = computedWidth;
      progressRef.current.style.transition = "none";
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    
    requestAnimationFrame(() => {
      if (progressRef.current) {
        progressRef.current.style.transition = "none";
        progressRef.current.style.width = "0%";
        
        // Force reflow
        progressRef.current.offsetHeight; // eslint-disable-line @typescript-eslint/no-unused-expressions
        progressRef.current.style.transition = `width ${delay}ms linear`;
        progressRef.current.style.width = "100%";
      }
    });
    
    autoplayTimeoutRef.current = setTimeout(() => {
      emblaApi?.scrollNext();
    }, delay);
  }, [emblaApi, delay, stopAutoplay]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (isPlaying && !isPaused && emblaApi) {
      startAutoplay();
    } else {
      stopAutoplay();
      if (!isPaused && progressRef.current) {
        progressRef.current.style.transition = "none";
        progressRef.current.style.width = "0%";
      }
    }
    
    return stopAutoplay;
  }, [isPlaying, isPaused, emblaApi, startAutoplay, stopAutoplay]);

  // Restart autoplay timer when the slide changes manually
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      if (isPlaying && !isPaused) {
        startAutoplay();
      }
    };
    
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isPlaying, isPaused, startAutoplay]);

  return {
    isPlaying: isPlaying && !isPaused,
    isAutoplayEnabled: isPlaying,
    toggleAutoplay,
    pause,
    resume,
    progressRef,
  };
}

