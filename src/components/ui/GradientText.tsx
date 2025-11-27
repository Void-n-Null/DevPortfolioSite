import React from 'react';

interface GradientTextProps {
  text: string;
  id: string; // Unique ID for gradient defs
  className?: string;
  colors: string[]; // Array of color vars or values
  animationDuration?: number;
}

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
      {/* Invisible text to establish layout size */}
      <span className="opacity-0 block">{text}</span>
      
      {/* Absolute SVG overlay for the effect */}
      <svg 
        className="absolute inset-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient 
            id={gradientId} 
            gradientUnits="userSpaceOnUse"
            x1="0%" y1="0%" x2="100%" y2="0%"
          >
            {/* Create a repeating pattern of colors for smooth looping */}
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
              from="-100% 0"
              to="100% 0"
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
          strokeWidth="3px"
          strokeLinejoin="round"
          className="font-bold" // Removed tracking-tighter to avoid conflict with parent
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

