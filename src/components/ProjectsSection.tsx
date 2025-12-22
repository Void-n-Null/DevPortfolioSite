"use client";

import { Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects_data";
import { ProjectGridCard } from "./projects/ProjectGridCard";

export function ProjectsSection() {
  // Define which projects get which sizes
  // AutoGPT and Imagine App (AI agent projects) get large tiles
  // GOAP and Rebang get medium tiles
  const getProjectSize = (id: string): "large" | "medium" | "small" => {
    if (id === "autogpt" || id === "imagine-app") return "large";
    return "medium";
  };

  return (
    <section id="work" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[80vw] mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-mono">
              Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Projects
            </h2>
          </div>
          <a
            href="https://github.com/Void-n-Null"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Row 1: Two large cards (AI agent projects) */}
          {projects.slice(0, 2).map((project) => (
            <div key={project.id} className="md:col-span-1">
              <ProjectGridCard 
                project={project} 
                size={getProjectSize(project.id)} 
              />
            </div>
          ))}
          
          {/* Row 2: Two medium cards */}
          {projects.slice(2, 4).map((project) => (
            <div key={project.id} className="md:col-span-1">
              <ProjectGridCard 
                project={project} 
                size={getProjectSize(project.id)} 
              />
            </div>
          ))}
        </div>

        {/* More projects hint */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <p className="text-sm text-muted-foreground/60">
            <span className="hidden sm:inline">These are highlights </span>
            More projects on{" "}
            <a 
              href="https://github.com/Void-n-Null" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
