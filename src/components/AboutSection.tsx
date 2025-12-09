import React from "react";
import { developerJourney, JourneyEntry } from "@/data/developerJourney";
import { aiObsession } from "@/data/aiObsession";

// ============================================================================
// CONTENT RENDERING UTILITIES
// ============================================================================

function renderWithBreaks(text: string, keyPrefix: string) {
  const parts = text.split("\n").filter(p => p.trim());
  return parts.map((part, index) => (
    <React.Fragment key={`${keyPrefix}-${index}`}>
      {part}
      {index < parts.length - 1 && <><br /><br /></>}
    </React.Fragment>
  ));
}

function InlineLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 text-primary font-medium 
        hover:text-primary/80 transition-colors duration-200"
    >
      <span className="border-b border-primary/40 hover:border-primary/80 transition-colors">
        {text}
      </span>
      <svg 
        className="w-3 h-3 opacity-60" 
        viewBox="0 0 12 12" 
        fill="none"
      >
        <path 
          d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function renderContentWithLinks(
  content: string, 
  links?: { text: string; href: string }[],
  keyPrefix = "content"
) {
  if (!links?.length) {
    return renderWithBreaks(content, keyPrefix);
  }

  const escapedTexts = links.map((l) =>
    l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedTexts.join("|")})`, "g");
  const segments = content.split(pattern);

  return (
    <>
      {segments.map((segment, index) => {
        if (!segment) return null;
        const link = links.find((l) => l.text === segment);
        if (link) {
          return <InlineLink key={index} href={link.href} text={link.text} />;
        }
        return (
          <React.Fragment key={`${keyPrefix}-${index}`}>
            {renderWithBreaks(segment, `${keyPrefix}-seg-${index}`)}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

function SectionLabel({ children, color = "primary" }: { children: React.ReactNode; color?: "primary" | "secondary" }) {
  const colorClass = color === "secondary" ? "text-neon-secondary" : "text-primary";
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className={`text-xs uppercase tracking-[0.2em] font-medium ${colorClass}`}>
        {children}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
}

// ============================================================================
// JOURNEY BLOCK
// ============================================================================

function JourneyBlock({ entry }: { entry: JourneyEntry }) {
  return (
    <div className="py-4 sm:py-6 first:pt-0 last:pb-0">
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
        {renderContentWithLinks(entry.content, entry.links, entry.id)}
      </p>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AboutSection() {
  // Separate journey entries
  const fullJourneyEntries = developerJourney.filter(e => e.layout === "full");

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ================================================================ */}
        {/* HERO HEADER */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  leading-[0.9]">
            <span className="text-foreground text-red-hat-mono">Self-taught</span>
            <br />
            <span className="text-gradient text-red-hat-mono">AI-obsessed</span>
          </h2>
        </div>

        {/* ================================================================ */}
        {/* DEVELOPER JOURNEY */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <SectionLabel>Developer Journey</SectionLabel>
          
          <div className="divide-y divide-border/20">
            {fullJourneyEntries.map((entry) => (
              <JourneyBlock key={entry.id} entry={entry} />
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* AI OBSESSION */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <SectionLabel color="secondary">AI Obsession</SectionLabel>
          
          <div className="space-y-6 sm:space-y-8">
            {aiObsession.map((entry) => {
              // Featured entry with video
              if (entry.featured) {
                return (
                  <div key={entry.id}>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                      {renderContentWithLinks(entry.content, entry.links, entry.id)}
                    </p>
                    
                    {entry.featured.video && (
                      <div className="rounded-xl overflow-hidden border border-border/30 bg-black/20 mb-6 sm:mb-8">
                        <video 
                          className="w-full h-auto"
                          controls
                          preload="metadata"
                          poster={entry.featured.video.poster}
                        >
                          <source src={entry.featured.video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        {entry.featured.videoCaption && (
                          <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-border/20 bg-card/30">
                            <p className="text-sm text-muted-foreground">
                              {renderContentWithLinks(
                                entry.featured.videoCaption, 
                                entry.featured.videoCaptionLinks,
                                `${entry.id}-caption`
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {entry.featured.additionalContent && (
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {renderWithBreaks(entry.featured.additionalContent, `${entry.id}-additional`)}
                      </p>
                    )}
                  </div>
                );
              }

              // Regular entry
              return (
                <p 
                  key={entry.id} 
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                >
                  {renderContentWithLinks(entry.content, entry.links, entry.id)}
                </p>
              );
            })}
          </div>
        </div>

        {/* ================================================================ */}
        {/* SKILLS - Minimalist content, bold design */}
        {/* ================================================================ */}
        <div>
          <SectionLabel>What I Work With</SectionLabel>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Specialty", value: "AI Agent Systems" },
              { label: "Primary", value: "C# / .NET" },
              { label: "Secondary", value: "Python, TypeScript" },
              { label: "Philosophy", value: "Iterate to Innovate" },
            ].map((skill) => (
              <div 
                key={skill.label}
                className="group relative p-4 sm:p-6 rounded-xl border border-border/30
                  hover:border-primary/40 transition-colors duration-200"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {skill.label}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground 
                  group-hover:text-primary transition-colors duration-200">
                  {skill.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
