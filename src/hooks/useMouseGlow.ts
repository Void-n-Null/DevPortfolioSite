"use client";

import { useEffect, RefObject } from "react";

interface UseMouseGlowOptions {
  radius?: number;
}

export function useMouseGlow(
  glowRef: RefObject<HTMLElement | null>,
  containerRef?: RefObject<HTMLElement | null>,
  options: UseMouseGlowOptions = {}
) {
  const { radius = 250 } = options;

  useEffect(() => {
    const glowElement = glowRef.current;
    if (!glowElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      const gradient = `radial-gradient(${radius}px circle at ${x}px ${y}px, black, transparent)`;
      glowElement.style.maskImage = gradient;
      glowElement.style.webkitMaskImage = gradient;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [glowRef, containerRef, radius]);
}



