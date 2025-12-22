"use client";

import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown } from "lucide-react";
import { GridBackground } from "@/components/GridBackground";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { HeroSection } from "@/components/HeroSection";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Determine active section
      const sections = ["hero", "work", "about", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section === "hero" ? "hero-section" : section);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <GridBackground />

      {/* Floating Social Links - Desktop Only */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        <div className="flex flex-col gap-3 p-3 rounded-2xl glass">
          <a
            href="mailto:hello@blake-werlinger.com"
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Void-n-Null"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/blake-werlinger-757152202/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        
        {/* Section indicator */}
        <div className="flex flex-col gap-2 p-2 rounded-2xl glass mt-4 w-fit mx-auto">
          {[
            { id: "hero", label: "Top" },
            { id: "work", label: "Work" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((section) => (
            <a
              key={section.id}
              href={`#${section.id === "hero" ? "hero-section" : section.id}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              title={section.label}
            />
          ))}
        </div>
      </aside>

      {/* Top Nav - Appears on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Nav Links */}
            <div className="flex items-center gap-8">
              {[
                { href: "#work", label: "Work" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="mailto:hello@blake-werlinger.com"
              className={`hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            >
              Let&apos;s talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div className="flex items-center gap-1 p-1.5 rounded-full glass">
          {[
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        <section id="hero-section">
          <HeroSection />
        </section>
        
        <ProjectsSection />
        <AboutSection />

        {/* Contact Footer - Combines Contact + Footer */}
        <footer id="contact" className="relative py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            {/* Main CTA */}
            <div className="text-center mb-16 sm:mb-24">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6 font-mono">
                Get in touch
              </p>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                Let&apos;s build<br />
                <span className="text-gradient">something great</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10">
                Always happy to chat about AI tools or projects
              </p>
              <a
                href="mailto:hello@blake-werlinger.com"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:gap-4"
              >
                hello@blake-werlinger.com
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* Links Grid */}
            <div className="grid sm:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
              <a
                href="mailto:hello@blake-werlinger.com"
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Email
                </span>
              </a>
              <a
                href="https://github.com/Void-n-Null"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  GitHub
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/blake-werlinger-757152202/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  LinkedIn
                </span>
              </a>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/20">
              <span className="text-sm text-muted-foreground/50">
                © {new Date().getFullYear()} Blake Werlinger
              </span>
              <span className="text-xs text-muted-foreground/30">
                Built with Next.js · Open to contract work · Prefer async
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll indicator - Hero only */}
      <a
        href="#work"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-muted-foreground/50 hover:text-primary transition-all duration-500 hidden lg:block ${
          scrolled ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100"
        }`}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>
    </div>
  );
}
