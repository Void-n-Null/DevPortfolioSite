"use client";

import { useRef } from "react";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const gridColor = "rgba(255, 255, 255, 0.02)";
const glowColor = "rgba(56, 149, 248, 0.3)";

export function GridBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useMouseGlow(glowRef, undefined, { radius: 420 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glowing grid - masked by mouse position */}
      <div 
        ref={glowRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${glowColor} 1px, transparent 1px), linear-gradient(90deg, ${glowColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(500px circle at -1000px -1000px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(500px circle at -1000px -1000px, black, transparent)`,
        }}
      />
    </div>
  );
}
