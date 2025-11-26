import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from "lucide-react";
import { GridBackground } from "@/components/GridBackground";
import { ProjectsSection } from "@/components/ProjectsSection";

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
        {/* Hero */}
        <section className="min-h-[calc(100vh-15rem)] flex items-end px-8 pb-24 justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-bold tracking-tighter leading-[0.85]">
              <span className="text-foreground">Blake</span>
              <br />
              <span className="text-gradient">Werlinger</span>
            </h1>
            
            <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-24">
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                C# (.NET) backends, AI agents, game systems and architecture.
              </p>
              
              <div className="flex flex-col gap-6 lg:items-end">
                <div className="flex items-center gap-6">
                  <a 
                    href="mailto:hello@blakewerlinger.dev" 
                    className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a 
                    href="https://github.com/Void-n-Null" 
                    className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground lg:text-right">
                  Open to contract work · Prefer async
                </p>
              </div>
            </div>
          </div>
          
          <a 
            href="#about" 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </section>

        {/* About */}
        <section id="about" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,2fr] gap-16 lg:gap-24">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Self-taught, AI-obsessed.
                </h2>
              </div>
              
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <h3 className="text-2xl font-bold leading-tight">Developer Journey</h3>
                <p>
                  I started messing with <a href="https://scratch.mit.edu/" className="text-primary hover:underline">Scratch</a> at around age 11, I enjoyed creating some basic games and learned programming fundementals. 
                  <br/>At age 14, I moved to Unity and C#, and kept building whatever felt interesting. I learn fast when there&apos;s a real problem in front of me.
                </p>
                <h3 className="text-2xl font-bold leading-tight">AI Obsession</h3>
                <p>
                  I have been invested in AI since even before the launch of GPT-3.5 in December of 2021. I have always loved the idea of letting machines reason over situations, and LLMs have facinated me to no end.
                  <br/> <br/>
                  In April 2023 I worked with Toran Bruce Richards as well as some other early contributors on{" "}
                  <a href="https://github.com/Significant-Gravitas/AutoGPT" className="text-primary hover:underline">
                    AutoGPT
                  </a>{". "}
                  <br/>
                  This was early on in the development of AutoGPT and I was both an early contributor as well as part of a team that discussed the future of the project.
                  AutoGPT was a major milestone in the development of AI agents. It was one of the first projects to use LLMs for agentic workflows, and it still to this day sits at 24th of the most starred repositories on GitHub.
                  While my code contributions were not large scale, I was glad to be part of a team that had ideas for the future of Agentic AI.
                </p>
              </div>
            </div>
            
            <div className="mt-32 grid sm:grid-cols-3 gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">What I do</p>
                <p className="text-foreground text-lg">
                  Technical planning, AI prototyping, gameplay systems, tool chains.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Languages</p>
                <p className="text-foreground text-lg">
                  C#, Python, JavaScript
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Tools</p>
                <p className="text-foreground text-lg">
                  Godot, Unity, custom engines, VS Code, CachyOS
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <ProjectsSection />

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
                  href="mailto:hello@blakewerlinger.dev" 
                  className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  hello@blakewerlinger.dev
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
                  href="https://linkedin.com/in/blakewerlinger" 
                  className="group flex items-center gap-4 text-2xl sm:text-3xl font-medium hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                  linkedin.com/in/blakewerlinger
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground/50">
            <span>© {new Date().getFullYear()}</span>
            <span>Late nights, PST</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
