import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { GridBackground } from "@/components/GridBackground";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <GridBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">

          <div className="flex items-center gap-10">
            <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">
              About
            </a>
            <a href="#work" className="text-sm text-white/70 hover:text-white transition-colors">
              Work
            </a>
            <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />


        {/* Contact */}
        <section id="contact" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Contact</p>
                <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
                  Let&apos;s talk.
                </h2>
                <p className="text-lg text-muted-foreground mt-8 max-w-md leading-relaxed">
                  I answer emails and DMs fast. If you want help on a system, want feedback on an idea, or just want to swap notes on AI tools, reach out.
                </p>
              </div>
              
              <div className="flex flex-col justify-end gap-8">
                <a 
                  href="mailto:hello@blake-werlinger.com" 
                  className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  hello@blake-werlinger.com
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a 
                  href="https://github.com/Void-n-Null" 
                  className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
                >
                  <Github className="w-6 h-6 text-primary" />
                  github.com/Void-n-Null
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/blake-werlinger-757152202/" 
                  className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                  linkedin.com/blake-werlinger
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground/50">
            <span>© {new Date().getFullYear()}</span>

          </div>
        </footer>
      </main>
    </div>
  );
}
