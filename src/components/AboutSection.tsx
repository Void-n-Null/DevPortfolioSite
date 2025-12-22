import React from "react";
import { developerJourneySections } from "@/data/developerJourney";
import { aiObsessionSections } from "@/data/aiObsession";
import { ContentSection, ContentEntry } from "@/data/schema";
import { SimpleIcon } from "@/components/ui/SimpleIcon";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
// SHARED COMPONENTS
// ============================================================================

function SectionLabel({ 
  children, 
  color = "primary" 
}: { 
  children: React.ReactNode; 
  color?: "primary" | "secondary" | string 
}) {
  const colorClass = 
    color === "secondary" ? "text-neon-secondary" : 
    color === "primary" ? "text-primary" : "";
  
  const style = color !== "primary" && color !== "secondary" ? { color } : {};

  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className={`text-xs uppercase tracking-[0.2em] font-medium ${colorClass}`} style={style}>
        {children}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
}

function SubsectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-6">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md  "
        aria-hidden="true"
      >
        <span className="w-8 h-8">{icon}</span>
      </span>
      <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-wide">
        {title}
      </h3>
      <div className="flex-1 h-px bg-border/30" />
    </div>
  );
}

function ContentBlock({ entry }: { entry: ContentEntry }) {
  return (
    <div className="py-4 sm:py-6 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {entry.metadata?.badge && (
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider px-2 py-0 h-5 bg-primary/5 border-primary/20 text-primary">
            {entry.metadata.badge}
          </Badge>
        )}
        {entry.metadata?.date && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {entry.metadata.date}
          </span>
        )}
      </div>
      
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {renderContentWithLinks(entry.content, entry.links, entry.id)}
          </p>

          {entry.featured && (
            <div className="mt-6 sm:mt-8">
              {entry.featured.video && (
                <div className="rounded-xl overflow-hidden border border-border/30 bg-black/20 mb-6">
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

              {entry.featured.image && (
                <div className="rounded-xl overflow-hidden border border-border/30 bg-black/20 mb-6">
                  <Image
                    src={entry.featured.image.src}
                    alt={entry.featured.image.alt}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                  />
                  {entry.featured.image.caption && (
                    <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-border/20 bg-card/30">
                      <p className="text-sm text-muted-foreground">
                        {entry.featured.image.caption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {entry.featured.additionalContent && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {renderWithBreaks(
                    entry.featured.additionalContent,
                    `${entry.id}-additional`
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RenderSection({ section }: { section: ContentSection }) {
  const iconNode =
    section.icon.kind === "simple" ? (
      <SimpleIcon
        icon={section.icon.icon}
        className="w-full h-full"
        style={{ color: `#${section.icon.icon.hex}`, ...section.icon.style }}
      />
    ) : (
      <Image
        src={section.icon.src}
        alt={section.icon.alt}
        width={16}
        height={16}
        className="w-full h-full object-contain"
      />
    );

  return (
    <div key={section.id}>
      <SubsectionHeader title={section.title} icon={iconNode} />
      <div className="divide-y divide-border/20">
        {section.entries.map((entry) => (
          <ContentBlock key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AboutSection() {
  const journeySections = (developerJourneySections as ContentSection[])
    .map((section) => ({
      ...section,
      entries: section.entries.filter((e) => e.layout !== "half"),
    }))
    .filter((section) => section.entries.length > 0);

  const aiSections = (aiObsessionSections as ContentSection[]).filter(
    (section) => section.entries.length > 0
  );

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ================================================================ */}
        {/* HERO HEADER */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  leading-[0.9]">
            <span className="text-foreground font-mono">Self-taught</span>
            <br />
            <span className="text-gradient font-mono">AI-obsessed</span>
          </h2>
        </div>

        {/* ================================================================ */}
        {/* DEVELOPER JOURNEY */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <SectionLabel>Developer Journey</SectionLabel>
          
          <div className="space-y-10 sm:space-y-12">
            {journeySections.map((section) => (
              <RenderSection key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* AI OBSESSION */}
        {/* ================================================================ */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <SectionLabel color="secondary">AI Obsession</SectionLabel>
          
          <div className="space-y-10 sm:space-y-12">
            {aiSections.map((section) => (
              <RenderSection key={section.id} section={section} />
            ))}
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
