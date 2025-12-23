"use client";

import { useEffect, RefObject, useRef } from "react";

interface UseMouseGlowOptions {
  radius?: number;
  stretchFactor?: number;
}

export function useMouseGlow(
  glowRef: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  containerRef?: RefObject<HTMLElement | null>,
  options: UseMouseGlowOptions = {}
) {
  const { radius = 250, stretchFactor = 0 } = options;
  const rectRef = useRef<DOMRect | null>(null);
  const lastMousePos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const refs = Array.isArray(glowRef) ? glowRef : [glowRef];
    const firstValidRef = refs.find(ref => ref.current);
    if (!firstValidRef) return;

    // Use window as fallback if no containerRef is provided
    const container = containerRef?.current || null;

    const updateGlow = (x: number, y: number, dx: number = 0, dy: number = 0) => {
      let relativeX = x;
      let relativeY = y;

      if (container) {
        if (!rectRef.current) {
          rectRef.current = container.getBoundingClientRect();
        }
        relativeX = x - rectRef.current.left;
        relativeY = y - rectRef.current.top;
      }

      const rx = radius * (1 + Math.abs(dy) * stretchFactor);
      const ry = radius * (1 + Math.abs(dx) * stretchFactor);

      const gradient = `radial-gradient(ellipse ${rx}px ${ry}px at ${relativeX}px ${relativeY}px, black, transparent)`;
      
      refs.forEach(ref => {
        if (ref.current) {
          ref.current.style.maskImage = gradient;
          ref.current.style.webkitMaskImage = gradient;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const isFirstMove = lastMousePos.current.x === -1000;
      const dx = isFirstMove ? 0 : e.clientX - lastMousePos.current.x;
      const dy = isFirstMove ? 0 : e.clientY - lastMousePos.current.y;
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        updateGlow(e.clientX, e.clientY, dx, dy);
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
