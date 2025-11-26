"use client";

import { useRef } from "react";
import { useMouseGlow } from "@/hooks/useMouseGlow";

export function GridBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useMouseGlow(glowRef, undefined, { radius: 500 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glowing grid - masked by mouse position */}
      <div 
        ref={glowRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(500px circle at -1000px -1000px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(500px circle at -1000px -1000px, black, transparent)`,
        }}
      />
    </div>
  );
}
