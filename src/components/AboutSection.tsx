import { developerJourney, JourneyEntry } from "@/data/developerJourney";
import { aiObsession } from "@/data/aiObsession";

function renderJourneyContent(entry: JourneyEntry) {
  const links = entry.links ?? [];

  if (!links.length) {
    return entry.content;
  }

  const escapedTexts = links.map((l) =>
    l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedTexts.join("|")})`, "g");

  const segments = entry.content.split(pattern);

  return (
    <>
      {segments.map((segment, index) => {
        if (!segment) return null;

        const link = links.find((l) => l.text === segment);
        if (!link) {
          return <span key={index}>{segment}</span>;
        }

        return (
          <a
            key={index}
            href={link.href}
            className="text-primary hover:underline font-medium"
          >
            {link.text}
          </a>
        );
      })}
    </>
  );
}

function renderAIContent(content: string, links?: { text: string; href: string }[]) {
  if (!links?.length) {
    return content;
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
        if (!link) {
          return <span key={index}>{segment}</span>;
        }
        return (
          <a
            key={index}
            href={link.href}
            className="text-primary hover:underline font-medium"
          >
            {link.text}
          </a>
        );
      })}
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-32 relative">
          <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6 ml-4">About</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.85] max-w-5xl">
            <span className="text-foreground">Self-taught,</span>
            <br />
            <span className="text-gradient">AI-obsessed.</span>
          </h2>
        </div>

        {/* Developer Journey */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-1.5 flex-1 bg-gradient-to-r from-transparent to-border max-w-[100px]" />
            <h3 className="text-xl uppercase tracking-[0.2em] text-primary/80">Developer Journey</h3>
            <div className="h-1.5 flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="space-y-8">
            {developerJourney.map((entry) => {
              const fullEntries = developerJourney.filter(e => e.layout === "full");
              const halfEntries = developerJourney.filter(e => e.layout === "half");
              
              // Render full-width entries
              if (entry.layout === "full") {
                const fullIndex = fullEntries.findIndex(e => e.id === entry.id);
                const gradients = [
                  "bg-gradient-to-r from-primary/5 to-transparent",
                  "bg-gradient-to-r from-transparent via-primary/5 to-transparent",
                  "bg-gradient-to-l from-primary/5 to-transparent",
                ];
                
                return (
                  <div key={entry.id} className="group relative">
                    <div className={`absolute inset-0 ${gradients[fullIndex % gradients.length]} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors">
                      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        {renderJourneyContent(entry)}
                      </p>
                    </div>
                  </div>
                );
              }
              
              // Render half-width entries as a grid (only on first half entry)
              if (entry.layout === "half" && halfEntries[0]?.id === entry.id) {
                return (
                  <div key="half-grid" className="grid lg:grid-cols-2 gap-8">
                    {halfEntries.map((halfEntry) => (
                      <div key={halfEntry.id} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-8 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors h-full">
                          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            {renderJourneyContent(halfEntry)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              
              // Skip subsequent half entries (already rendered in grid)
              if (entry.layout === "half") return null;
              
              return null;
            })}
          </div>
        </div>

        {/* AI Obsession */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-1.5 flex-1 bg-gradient-to-r from-transparent to-border max-w-[100px]" />
            <h3 className="text-xl uppercase tracking-[0.2em] text-neon-secondary/80">AI Obsession</h3>
            <div className="h-1.5 flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="space-y-8">
            {aiObsession.map((entry) => {
              // Featured entry with video
              if (entry.featured) {
                return (
                  <div key={entry.id} className="relative mt-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="bg-black/40 relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-neon-secondary/20 transition-colors">
                      <div className="space-y-8">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                          {renderAIContent(entry.content, entry.links)}
                        </p>
                        
                        {entry.featured.video && (
                          <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50">
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
                              <div className="p-4 border-t border-border/30">
                                <p className="text-md text-muted-foreground">
                                  {renderAIContent(entry.featured.videoCaption, entry.featured.videoCaptionLinks)}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {entry.featured.additionalContent && (
                          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            {entry.featured.additionalContent}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular entry
              return (
                <div key={entry.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-l from-neon-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="bg-black/40 relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-neon-secondary/20 transition-colors">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      {renderAIContent(entry.content, entry.links)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Specialty",
                title: "AI Agent Systems",
                desc: "Planning architectures, tool orchestration, context management",
              },
              {
                label: "Core Stack",
                title: "C# / .NET",
                desc: "Backends, game engines, high-performance systems",
              },
              {
                label: "Also Fluent",
                title: "Python, TypeScript",
                desc: "AI tooling, web apps, rapid prototyping",
              },
              {
                label: "Approach",
                title: "Iteration is Innovation",
                desc: "Same concept, different contexts. That's how you find novel solutions.",
              },
            ].map((skill) => (
              <div 
                key={skill.title}
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 h-full">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-medium">{skill.label}</p>
                  <p className="text-foreground text-xl font-bold mb-3 group-hover:text-primary transition-colors">{skill.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
