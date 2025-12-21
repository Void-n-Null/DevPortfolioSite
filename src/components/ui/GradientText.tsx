"use client";

import React from 'react';

interface GradientTextProps {
  text: string;
  id: string; // Unique ID for gradient defs
  className?: string;
  colors: string[]; // Array of color vars or values
  animationDuration?: number;
}

/**
 * Restored version of GradientText that uses SVG for the gradient outline (stroke).
 * CSS background-clip: text can't do gradient outlines easily.
 */
export function GradientText({ 
  text, 
  id, 
  className = "", 
  colors,
  animationDuration = 8
}: GradientTextProps) {
  const gradientId = `gradient-${id}`;
  
  return (
    <span className={`relative inline-block select-none ${className}`}>
      {/* Invisible text to establish layout size - essential for relative positioning */}
      <span className="opacity-0 block whitespace-pre">{text}</span>
      
      {/* SVG overlay for the gradient stroke effect */}
      <svg 
        className="absolute inset-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient 
            id={gradientId} 
            gradientUnits="userSpaceOnUse"
            x1="-50%" y1="0%" x2="150%" y2="0%"
          >
            {colors.map((color, i) => (
              <stop 
                key={i} 
                offset={`${(i / (colors.length - 1)) * 100}%`} 
                stopColor={color} 
              />
            ))}
            
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur={`${animationDuration}s`}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2px"
          strokeLinejoin="round"
          className="font-bold"
          style={{
            fontSize: '100%',
          }}
        >
          {text}
        </text>
      </svg>
    </span>
  );
}
