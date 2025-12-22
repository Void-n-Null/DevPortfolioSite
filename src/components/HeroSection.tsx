"use client";

import { GradientText } from "./ui/GradientText";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full relative">


        {/* Main heading */}
        <h1 className="mb-8 animate-fade-in-up">
          <span className="block text-[14vw] sm:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-mono font-bold tracking-tighter leading-[0.85]">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300 origin-left">
              <GradientText 
                text="BLAKE" 
                id="blake" 
                colors={["var(--primary)", "var(--neon-secondary)", "var(--primary)"]} 

              />
            </span>
          </span>
          <span className="block text-[14vw] sm:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-mono font-bold tracking-tighter leading-[0.85] -mt-2 sm:-mt-4">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300 origin-left">
              <GradientText 
                text="WERLINGER" 
                id="werlinger" 
                colors={["var(--neon-secondary)", "var(--primary)", "var(--neon-secondary)"]} 

              />
            </span>
          </span>
        </h1>
        
        {/* Tagline */}
        <div className="max-w-2xl animate-fade-in-up delay-200">
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed mb-8">
            Self-taught since 2015. Early{" "}
            <span className="text-foreground font-medium">AutoGPT contributor</span>.{" "}
            Building with C#, Python, and AI agents.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300"
            >
              View my work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
            href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span className="border-b border-transparent group-hover:border-current transition-colors">
                Get in touch
              </span>
            </a>
          </div>
        </div>


      </div>


    </section>
  );
}
