export interface ProjectImage {
  src: string;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  link: string;
  github?: string;
  featured: boolean;
  status?: "shipped" | "building" | "contribution";
  textColor?: string;
  image?: ProjectImage;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "autogpt",
    title: "AutoGPT",
    description:
      "Contributed to the development of AutoGPT, one of the first projects to use LLMs for agentic workflows. Worked directly with Toran Bruce Richards on agent architecture.",
    longDescription:
      "Early contributor to AutoGPT during its explosive growth phase. Built a recursive summarization system for context compression and added Selenium-based web search capabilities. Participated in architecture discussions that shaped modern AI agent design patterns.",
    tech: ["Python", "GPT-4", "Prompt Engineering", "Selenium"],
    link: "https://github.com/Significant-Gravitas/AutoGPT",
    github: "https://github.com/Significant-Gravitas/AutoGPT",
    featured: true,
    status: "contribution",
    highlights: [
      "180k+ GitHub stars",
      "Pre-function-calling era",
      "Context compression system",
    ],
  },
  {
    id: "imagine-app",
    title: "Imagine App",
    description:
      "An agentic AI assistant for Best Buy product search. Built a complete tool-calling architecture with fluent API client and OpenRouter OAuth integration.",
    longDescription:
      "A Flutter mobile app demonstrating production-ready AI agent architecture. Features a custom AgentRunner implementing the classic think → tool call → execute → observe loop, a fluent builder API for Best Buy's product catalog, and OAuth PKCE authentication for 200+ LLM models via OpenRouter.",
    tech: ["Flutter", "Dart", "OpenRouter", "AI Agents"],
    link: "https://github.com/Void-n-Null/Imagine-App",
    github: "https://github.com/Void-n-Null/Imagine-App",
    featured: true,
    status: "shipped",
    image: {
      src: "/imagine_app_demo.png",
      scale: 1.2,
      offsetX: 0,
      offsetY: 0,
      opacity: 0.4,
    },
    highlights: [
      "Full agentic loop",
      "200+ LLM models",
      "Fluent API design",
    ],
  },
  {
    id: "godot-goap",
    title: "Godot GOAP Demo",
    description:
      "High-performance goal-oriented action planner in Godot. Custom ECS, custom sprite renderer that bypasses the scene tree, backward dependency pruning.",
    longDescription:
      "Built a complete AI planning system from scratch that achieves 10,000+ plans per second through aggressive optimization. Features a custom Entity Component System, a sprite renderer that bypasses Godot's scene tree for performance, and backward dependency pruning to minimize search space.",
    tech: ["C#", "Godot", "JetBrains Rider"],
    link: "https://github.com/Void-n-Null/godot-goap-demo",
    github: "https://github.com/Void-n-Null/godot-goap-demo",
    featured: true,
    status: "shipped",
    textColor: "text-cyan-200",
    image: {
      src: "/goap_demo_example.png",
      scale: 1.4,
      offsetX: -50,
      offsetY: 0,
      opacity: 0.35,
    },
    highlights: [
      "10,000+ plans/sec",
      "Custom ECS architecture",
      "Scene tree bypass rendering",
    ],
  },
  {
    id: "rebang",
    title: "Rebang",
    description:
      "A simple but powerful search redirector using bangs. Optimized a 13,000 bang database to be ~43% smaller and built a custom bang creation tool.",
    longDescription:
      "A browser extension and web app that supercharges your search workflow with DuckDuckGo-style bangs. Compressed a massive bang database by 43% while maintaining instant lookup. Includes a visual editor for creating and managing custom bangs.",
    tech: ["TypeScript", "React", "Tailwind", "Shadcn"],
    link: "https://github.com/Void-n-Null/rebang",
    github: "https://github.com/Void-n-Null/rebang",
    featured: true,
    status: "shipped",
    image: {
      src: "/rebang_example.png",
      scale: 1.7,
      offsetX: -22,
      offsetY: -4,
      opacity: 0.5,
    },
    highlights: [
      "43% smaller bang database",
      "Custom bang editor",
      "Instant search redirection",
    ],
  },
];
