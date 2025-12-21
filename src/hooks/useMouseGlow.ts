"use client";

import { useEffect, RefObject, useRef } from "react";

interface UseMouseGlowOptions {
  radius?: number;
}

export function useMouseGlow(
  glowRef: RefObject<HTMLElement | null>,
  containerRef?: RefObject<HTMLElement | null>,
  options: UseMouseGlowOptions = {}
) {
  const { radius = 250 } = options;
  const rectRef = useRef<DOMRect | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const glowElement = glowRef.current;
    if (!glowElement) return;

    // Use window as fallback if no containerRef is provided
    const container = containerRef?.current || null;

    const updateGlow = (x: number, y: number) => {
      let relativeX = x;
      let relativeY = y;

      if (container) {
        if (!rectRef.current) {
          rectRef.current = container.getBoundingClientRect();
        }
        relativeX = x - rectRef.current.left;
        relativeY = y - rectRef.current.top;
      }

      const gradient = `radial-gradient(${radius}px circle at ${relativeX}px ${relativeY}px, black, transparent)`;
      glowElement.style.maskImage = gradient;
      glowElement.style.webkitMaskImage = gradient;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        updateGlow(e.clientX, e.clientY);
      });
    };

    const handleMouseEnter = () => {
      if (container) {
        rectRef.current = container.getBoundingClientRect();
      }
    };

    const handleReset = () => {
      rectRef.current = null; // Invalidate cache on scroll/resize
    };

    const target = container || window;
    
    // If it's the window, we don't need mouseenter since the whole viewport is the target
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleReset, { passive: true });
    window.addEventListener("resize", handleReset);

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleReset);
      window.removeEventListener("resize", handleReset);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [glowRef, containerRef, radius]);
}
