"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { projects } from "@/data/projects_data";
import { projectCaseStudies } from "@/data/projects";
import { Github, ArrowUpRight, ChevronLeft, ExternalLink, X, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GridBackground } from "@/components/GridBackground";
import { SimpleIcon } from "@/components/ui/SimpleIcon";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const project = projects.find((p) => p.id === id);
  const caseStudy = projectCaseStudies[id];
  
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Track active section
      if (caseStudy) {
        for (const section of [...caseStudy.sections].reverse()) {
          const el = document.getElementById(section.id);
          if (el && el.getBoundingClientRect().top <= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [caseStudy]);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <GridBackground />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-neon-secondary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating nav */}
      <nav className="fixed top-6 left-0 right-0 z-40 px-6">
        <div className="max-w-[80vw] mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="group flex items-center gap-2 px-4 py-2.5 glass rounded-full hover:border-primary/40 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-primary group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono tracking-tight">Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.github && !project.link.includes("github.com") && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-full hover:border-primary/40 transition-all duration-300"
                title="View source"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all duration-300"
            >
              <span className="hidden sm:inline">
                {project.link.includes("github.com") ? "View Code" : "Visit"}
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Section nav - Desktop sidebar */}
      {caseStudy && caseStudy.sections.length > 1 && (
        <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
          <div className="flex flex-col gap-2 p-3 glass rounded-2xl">
            {caseStudy.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    activeSection === section.id ? "bg-primary scale-125" : "bg-current opacity-40"
                  }`}
                />
                <span className="text-xs font-mono tracking-tight w-fit max-w-[150px] truncate">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </aside>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="min-h-[70vh] flex flex-col justify-end px-6 pb-24 pt-32">
          <div className="max-w-[66vw] mx-auto w-full">
            {/* Meta row */}
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-medium tracking-tighter mb-8 leading-[0.9]">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/50">
                {project.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-[66vw] mb-12">
              {project.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono font-medium rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20"
              >
                {project.link.includes("github.com") ? "View Source Code" : "Visit Live Site"}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {project.github && project.github !== project.link && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 glass font-mono rounded-2xl hover:border-primary/40 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  Repository
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {project.image && (
          <div className="px-6 mb-24">
            <div className="max-w-[66vw] mx-auto">
              <button 
                onClick={() => setFullscreenImage({ src: project.image!.src, alt: project.title })}
                className="w-full group relative aspect-[16/9] overflow-hidden rounded-3xl border border-border/30 shadow-2xl shadow-black/50 cursor-zoom-in"
              >
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${project.image.src})`,
                    backgroundSize: `${(project.image.scale ?? 1.1) * 100}%`,
                    backgroundPosition: `${50 + (project.image.offsetX ?? 0)}% ${50 + (project.image.offsetY ?? 0)}%`,
                    backgroundRepeat: "no-repeat",
                    opacity: project.image.opacity ?? 1,
                  }}
                />
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
                
                {/* Zoom indicator */}
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm rounded-xl p-3
                  opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 pb-32">
          <div className="max-w-[66vw] mx-auto">
            <div className="grid lg:grid-cols-[1fr_280px] gap-16">
              {/* Main content */}
              <div className="space-y-20 order-2 lg:order-1">
                {caseStudy ? (
                  caseStudy.sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-32 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                          {section.title}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
                      </div>

                      <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                          {section.content}
                        </p>
                      </div>

                      {section.image && (
                        <button
                          onClick={() => setFullscreenImage(section.image!)}
                          className="group relative mt-10 w-full rounded-2xl overflow-hidden border border-border/30 shadow-xl cursor-zoom-in text-left"
                        >
                          <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            width={1200}
                            height={675}
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          {section.image.caption && (
                            <div className="px-6 py-4 bg-card/50 border-t border-border/20">
                              <p className="text-sm text-muted-foreground italic">
                                {section.image.caption}
                              </p>
                            </div>
                          )}
                          {/* Zoom indicator */}
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-2
                            opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                          </div>
                        </button>
                      )}

                      {section.gallery && section.gallery.length > 0 && (
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.gallery.map((img, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => setFullscreenImage(img)}
                              className="group relative rounded-2xl overflow-hidden border border-border/30 shadow-xl cursor-zoom-in text-left"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                width={800}
                                height={450}
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                              />
                              {img.caption && (
                                <div className="px-4 py-3 bg-card/50 border-t border-border/20">
                                  <p className="text-xs text-muted-foreground italic">
                                    {img.caption}
                                  </p>
                                </div>
                              )}
                              {/* Zoom indicator */}
                              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-2
                                opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </section>
                  ))
                ) : (
                  <section className="animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-xs font-mono text-primary/60">01</span>
                      <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                        The Story
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-border/50 to-transparent" />
                    </div>
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {project.longDescription || "Case study coming soon..."}
                      </p>
                    </div>
                  </section>
                )}

                {/* Highlights */}
                {project.highlights && (
                  <section className="animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-2xl font-mono font-semibold tracking-tight text-foreground">
                        Key Highlights
                      </h2>
                      <div className="flex-1 h-px bg-border/40" />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {project.highlights.map((h) => {
                        const isHuge = h.toLowerCase().includes("featured") || h.toLowerCase().includes("readme");
                        return (
                          <div
                            key={h}
                            className={`group relative p-8 transition-all duration-300 rounded-2xl border ${
                              isHuge 
                                ? "bg-primary/10 border-primary/30 w-full sm:w-[calc(100%-1rem)]" 
                                : "bg-muted/5 border-border/20 hover:border-primary/20 w-fit"
                            }`}
                          >
                            <div className="flex flex-col gap-3">
                              {isHuge && (
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                  <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold">
                                    Major Milestone
                                  </span>
                                </div>
                              )}
                              <p className={`text-foreground/90 font-medium leading-relaxed transition-colors ${
                                isHuge ? "text-xl sm:text-2xl" : "text-lg group-hover:text-foreground"
                              }`}>
                                {h}
                              </p>
                            </div>
                            
                            {isHuge && (
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Sparkles className="w-12 h-12 text-primary" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="order-1 lg:order-2 lg:sticky lg:top-32 lg:self-start space-y-6">
                {/* Tech Stack */}
                <div className="p-6 glass rounded-2xl">
                  <h3 className="font-mono font-bold text-xs uppercase tracking-[0.2em] mb-6 text-primary flex items-center gap-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-col flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t.name}
                        className="group flex items-center gap-2 px-3 py-1.5 text-lg font-mono bg-muted/50 text-muted-foreground rounded-lg border border-border/30 hover:text-foreground transition-all duration-200"
                      >
                        {t.icon && (
                          <div className="text-white/60 group-hover:text-white transition-colors">
                            {t.icon.kind === "simple" ? (
                              <SimpleIcon icon={t.icon.icon} className="w-5 h-5" />
                            ) : (
                              <Image src={t.icon.src} alt={t.icon.alt} width={20} height={20} className="w-5 h-5 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        )}
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="p-6 glass rounded-2xl">
                  <h3 className="font-mono font-bold text-xs uppercase tracking-[0.2em] mb-6 text-primary flex items-center gap-2">
                    Links
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {project.link.includes("github.com") ? "Source Code" : "Live Site"}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                    {project.github && project.github !== project.link && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                      >
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          GitHub
                        </span>
                        <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    )}
                  </div>
                </div>

              
              </aside>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-12 ">
          <div className="max-w-full mx-auto flex items-center justify-end gap-12 pr-32">
            <span className="text-xs text-muted-foreground/50">
              © {new Date().getFullYear()} Blake Werlinger
            </span>
          </div>
        </footer>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 z-[110]"
            onClick={() => setFullscreenImage(null)}
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-7xl max-h-[90vh] w-full relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            {fullscreenImage.caption && (
              <div className="mt-4 px-4 py-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  {fullscreenImage.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
