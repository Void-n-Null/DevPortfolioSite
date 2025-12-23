import { 
  siPython, 
  siFlutter, 
  siDart, 
  siGodotengine, 
  siTypescript, 
  siReact, 
  siTailwindcss, 
  siVite,
  siSelenium,
  siOpenrouter,
  siDotnet
} from "simple-icons";
import { TechItem } from "./schema";

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
  tech: TechItem[];
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
      "Contributed to the development of AutoGPT, A 180k+ starred project that was one of the first to use LLMs for agentic workflows. Worked directly with creator Toran Bruce Richards on agent architecture and features.",
    longDescription:
      "Early contributor to AutoGPT during its explosive growth phase. Built a recursive summarization system for context compression and added Selenium-based web search capabilities. Participated in architecture discussions that shaped modern AI agent design patterns.",
    tech: [
      { name: "Python", icon: { kind: "simple", icon: siPython } },
      { name: "OpenAI API", icon: { kind: "image", src: "/openai.svg", alt: "OpenAI API" } },
      { name: "Selenium", icon: { kind: "simple", icon: siSelenium } },
    ],
    link: "https://github.com/Significant-Gravitas/AutoGPT",
    github: "https://github.com/Significant-Gravitas/AutoGPT",
    featured: true,
    status: "contribution",
    image: {
      src: "/autogpt_card.png",
      opacity: 1,
    },
    highlights: [
      "Video demo featured in AutoGPT's official README",
      "180k+ GitHub stars",
      " Worked on a recursive context compression system",
      "Early agent architecture",
    ],
  },
  {
    id: "imagine-app",
    title: "Imagine App",
    description:
      "An agentic AI assistant for Best Buy product search. Built a complete tool-calling architecture with fluent API client and OpenRouter OAuth integration.",
    longDescription:
      "A Flutter mobile app demonstrating production-ready AI agent architecture. Features a custom AgentRunner implementing the classic think → tool call → execute → observe loop, a fluent builder API for Best Buy's product catalog, and OAuth PKCE authentication for 300+ LLM models via OpenRouter.",
    tech: [
      { name: "Flutter", icon: { kind: "simple", icon: siFlutter } },
      { name: "Dart", icon: { kind: "simple", icon: siDart } },
      { name: "OpenRouter", icon: { kind: "simple", icon: siOpenrouter } },
      { name: "Best Buy API", icon: { kind: "image", src: "/bestbuy.svg", alt: "Best Buy API" } },
    ],
    link: "https://github.com/Void-n-Null/Imagine-App",
    github: "https://github.com/Void-n-Null/Imagine-App",
    featured: true,
    status: "shipped",
    image: {
      src: "/imagine_chat.png",
      scale: 1,
      offsetX: 0,
      offsetY: 12,
      opacity: 1,
    },
    highlights: [
      "Full agentic loop with tool calling",
      "300+ LLM models via OpenRouter",
      "Fluent builder API design",
      "OpenRouter OAuth PKCE authentication",
    ],
  },
  {
    id: "godot-goap",
    title: "Godot GOAP Demo",
    description:
      "High-performance goal-oriented action planner in Godot. Custom ECS, custom sprite renderer that bypasses the scene tree, backward dependency pruning.",
    longDescription:
      "Built a complete AI planning system from scratch that achieves 76,500+ plans per second through aggressive optimization. Features a custom Entity Component System, a sprite renderer that bypasses Godot's scene tree for performance, and backward dependency pruning to minimize search space.",
    tech: [
      { name: "C#", icon: { kind: "simple", icon: siDotnet } },
      { name: "Godot", icon: { kind: "simple", icon: siGodotengine } },
    ],
    link: "https://github.com/Void-n-Null/godot-goap-demo",
    github: "https://github.com/Void-n-Null/godot-goap-demo",
    featured: true,
    status: "shipped",
    textColor: "text-cyan-200",
    image: {
      src: "/goap_demo.png",
      scale: 1.4,
      offsetX: 33,
      offsetY: -27,
      opacity: 1,
    },
    highlights: [
      "76,500 plans/sec throughput",
      "Custom ECS architecture",
      "Scene tree bypass rendering",
      "Two-stage A* planner",
    ],
  },
  {
    id: "rebang",
    title: "Rebang",
    description:
      "A fast, modern bang redirect service combining DuckDuckGo and Kagi bangs into one optimized database that supports custom bang creation.",
    longDescription:
      "A web app that supercharges your search workflow with DuckDuckGo-style bangs. Compressed a massive bang database by 35% while being organized and de-duplicated. Includes a React + Vite setup to create and manage custom bangs. As well as a nice UI for the user to search and use the bangs.",
    tech: [
      { name: "TypeScript", icon: { kind: "simple", icon: siTypescript } },
      { name: "React", icon: { kind: "simple", icon: siReact } },
      { name: "Tailwind", icon: { kind: "simple", icon: siTailwindcss } },
      { name: "Vite", icon: { kind: "simple", icon: siVite } },
    ],
    link: "https://rebang.online",
    github: "https://github.com/Void-n-Null/rebang",
    featured: true,
    status: "shipped",
    image: {
      src: "/rebang_screenshot.png",
      scale: 1.3,
      offsetX: 0,
      offsetY: 0,
      opacity: 1,
    },
    highlights: [
      "35% smaller optimized database",
      "DDG + Kagi bangs combined",
      "Custom bang editor",
      "Automated monthly updates",
    ],
  },
];
