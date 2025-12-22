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
  const lastMousePos = useRef({ x: -1000, y: -1000 });
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
      lastMousePos.current = { x: e.clientX, y: e.clientY };
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

    const handleScrollOrResize = () => {
      rectRef.current = null; // Invalidate cache
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        updateGlow(lastMousePos.current.x, lastMousePos.current.y);
      });
    };

    const target = container || window;
    
    // If it's the window, we don't need mouseenter since the whole viewport is the target
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [glowRef, containerRef, radius]);
}
