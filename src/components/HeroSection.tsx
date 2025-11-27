import { Github, Mail, ArrowUpRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
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
  );
}

