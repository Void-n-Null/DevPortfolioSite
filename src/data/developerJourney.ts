export interface JourneyEntry {
  id: string;
  content: string;
  layout: "full" | "half";
  links?: {
    text: string;
    href: string;
  }[];
}

import { siGodotengine, siPython, siScratch, siUnity } from "simple-icons";
import { ContentSection, ContentEntry } from "./schema";

export const developerJourneySections: ContentSection[] = [
  {
    id: "scratch",
    title: "Scratch (2015)",
    icon: { kind: "simple", icon: siScratch },
    entries: [
      {
        id: "scratch-start",
        content: `I got my start with Scratch around age 11. Nothing fancy, just dragging blocks around trying to make a clone of "Cookie Clicker" that didn't suck. I spent way too many hours on it, but that's where I learned programming fundamentals: variables, loops, and the satisfaction of "Making a Game".`,
        layout: "full",
        metadata: {
          badge: "First Steps",
          date: "2015",
        },
        links: [
          {
            text: "Scratch",
            href: "https://scratch.mit.edu/",
          },
        ],
      },
    ],
  },
  {
    id: "unity",
    title: "Unity + C# (2018+)",
    icon: { kind: "simple", icon: siUnity },
    entries: [
      {
        id: "unity-csharp",
        content: `By 14 (2018), I moved to Unity and C#. Over the next few years, I built 100+ prototypes exploring A* pathfinding, procedural terrain generation, data serialization and saving, a whole host of software design patterns, and both 2D and 3D systems. Most never shipped - they were learning exercises. I'd hit the interesting technical problem, solve it, then move on. Or I'd have a vision for the next GTA-5 and would burn myself out after a few weeks of building. \n\n Eventually, I started using my skills for game modding. I would use systems like MelonLoader to decompile IL2CPP executables and Harmony to extend RimWorld and Bloons TD 6. My Banana Farmer Tower mod for Bloons was featured by ISAB in a video with 1.4M views and downloaded by 180k players. It was the first big project that I properly shipped and got recognized for. I also made some popular mods for Rivals of Aether (100k downloads), though they were a lot more silly and less technically interesting.`,
        layout: "full",
        links: [
          {
            text: "Unity Engine",
            href: "https://unity.com/",
          },
          {
            text: "ISAB in a video with 1.4M views",
            href: "https://www.youtube.com/watch?v=4zgYe_OleeU",
          },
          {
            text: "180k players",
            href: "https://github-release-stats.ghostbyte.dev/Void-n-Null/Banana-Farmer-Tower"
          },
          {
            text: "mods for Rivals of Aether",
            href: "https://steamcommunity.com/sharedfiles/filedetails/?id=1989766083",
          }
        ],
      },

    ],
  },
  {
    id: "python",
    title: "Python (2021)",
    icon: { kind: "simple", icon: siPython },
    entries: [
      {
        id: "python-start",
        content: `In my senior year of high school, I spent around 2 months teaching myself Python to build a Jarvis-style voice assistant. I used an existing PyTorch library for intent recognition, trained it with custom training data, and learned a lot about ML training in order to make it consistent. \n\n This was before LLMs were small or good enough to run locally, so it was really just a bit of ML to infer intent and pair a request to the closest matching command. It actually did pretty good 60% of the time. It was a relatively straightforward project but I learned Python, NLP fundamentals, and how frustrating ML training can be when your dataset is tiny and your laptop has 4 cores and no GPU. \n\nIt was my first time working outside of C# and Unity, and it taught me that I could pick up new languages and ecosystems when I had a concrete goal."`,
      },
    ],
  },
  {
    id: "systems",
    title: "Performance obsession (Godot GOAP)",
    icon: { kind: "simple", icon: siGodotengine },
    entries: [
      {
        id: "performance-optimization",
        content: `I genuinely enjoy profiling. Finding a hot path, fixing it, and watching the metrics drop is deeply satisfying. It's puzzle-solving with immediate, measurable feedback.\n\nWith my Godot GOAP (Goal-Oriented Action Planning) system, I spent two months obsessively optimizing the AI planner for fun. Nobody asked me to. I just couldn't let it be slow. By implementing a two-stage approach with backward dependency analysis, I pruned up to 70% of the search space before even starting the A* search.\n\nCombined with zero-allocation patterns and cached state transitions, the results were dramatic: 70% reduction in planning time, 139.6% increase in throughput, and 10,000 concurrent agents each making intelligent decisions in just 0.020ms. That's the kind of performance that keeps rendering and physics budgets healthy.`,
        layout: "full",
        links: [
          {
            text: "Godot GOAP (Goal-Oriented Action Planning) system",
            href: "https://github.com/Void-n-Null/godot-goap-demo",
          },
        ],
        featured: {
          imageGallery: {
            images: [
              {
                src: "/planning_time_graph.png",
                alt: "Planning time optimization graph showing reduction from 110ms to 33ms",
                caption: "Planning time reduced by 70% through algorithmic pruning",
              },
              {
                src: "/throughput_graph.png",
                alt: "Throughput comparison showing 139.6% increase in plans per second",
                caption: "Throughput increased by 139.6% via zero-allocation patterns",
              },
            ],
            columns: 2,
          },
          additionalContent: `The graphs compare the Initial Feature-Complete Baseline and the Production-Optimized Head. This wasn't about over-engineering; it was about respecting the performance budget to ensure complex AI never steals from the rendering or physics thread.`,
        },
      },
    ],
  },
];

// Backwards-compatible export (flattened) in case other components still rely on it.
export const developerJourney: ContentEntry[] = developerJourneySections.flatMap(
  (section) => section.entries
);
