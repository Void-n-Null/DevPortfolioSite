export interface JourneyEntry {
  id: string;
  content: string;
  layout: "full" | "half";
  links?: {
    text: string;
    href: string;
  }[];
}

import { siDiscord, siGodotengine, siScratch, siUnity } from "simple-icons";
import { ContentSection, ContentEntry } from "./schema";

export const developerJourneySections: ContentSection[] = [
  {
    id: "scratch",
    title: "Scratch (2015)",
    icon: { kind: "simple", icon: siScratch },
    entries: [
      {
        id: "scratch-start",
        content: `I got my start with Scratch around age 11 (2015). Nothing fancy, just dragging blocks around trying to make a clone of "Cookie Clicker" that didn't suck. I spent way too many hours on it, but that's where I learned programming fundamentals.`,
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
        content: `By 14 (2018), I had moved to Unity Engine and C#. My first real project was "Spirit Steve". Which boiled down to a freecam first person game where you fly around a city and can interact with NPCs that are path finding. Learning how to use Unity's pathfinding system was my first real challenge. Most of my Unity projects never saw the light of day, but I learned a lot from those kinds of projects. Over the years, I built 100+ small or incomplete Unity projects. It's not because I abandoned them, but because building is how I learn. Each project taught me something new, and I moved on when I'd explored what I thought was interesting, and learned the skills necessary to test my ideas.`,
        layout: "full",
        links: [
          {
            text: "Unity Engine",
            href: "https://unity.com/",
          },
        ],
      },
      {
        id: "learning-pattern",
        content: `I learned more from building those random projects than I did from any tutorial. That's kind of been my pattern ever since: I learn fastest when I'm building something I actually want to exist. I don't learn well from tutorials, I'm legitimately entertained by the process of programming and iterating. I have spent many sleepless nights fixing something that I had the vision for, but had to develop the skills required to build it, and trial and error was as fun as it was frustrating.`,
        layout: "full",
      },
    ],
  },
  {
    id: "communities",
    title: "Communities + modding",
    icon: { kind: "simple", icon: siDiscord },
    entries: [
      {
        id: "dev-communities",
        content: `I've been active in Discord game developer communities for a long time. I've built popular mods for RimWorld and Bloons TD 6, including a Banana Farmer Tower mod reviewed by ISAB (1.4M views). I've reverse-engineered Unity game systems, extended core mechanics, and shipped projects.`,
        layout: "full",
        links: [
          {
            text: "RimWorld",
            href: "https://store.steampowered.com/app/294100/RimWorld/",
          },
          {
            text: "Bloons TD 6",
            href: "https://store.steampowered.com/app/960090/Bloons_TD_6/",
          },
          {
            text: "Banana Farmer Tower mod reviewed by ISAB",
            href: "https://www.youtube.com/watch?v=4zgYe_OleeU",
          },
        ],
      },
    ],
  },
  {
    id: "systems",
    title: "Systems + performance (Godot GOAP demo)",
    icon: { kind: "simple", icon: siGodotengine },
    entries: [
      {
        id: "early-stages",
        content: `And if I can be completely honest: I've learned that I love the early stages of a project almost as much as finishing it. There's something about sketching out an architecture, finding the creativity in the design as much as the implementation, weighing different algorithmic trade-offs, and figuring out how all the pieces fit together that just clicks for me.\n\nWith the Godot GOAP Technical Demo, I spent a couple of nights just sitting there profiling, finding hot paths, and fixing them over and over again... for fun...`,
        layout: "full",
        links: [
          {
            text: "Godot GOAP Technical Demo",
            href: "https://github.com/Void-n-Null/godot-goap-demo",
          },
        ],
      },
    ],
  },
];

// Backwards-compatible export (flattened) in case other components still rely on it.
export const developerJourney: ContentEntry[] = developerJourneySections.flatMap(
  (section) => section.entries
);
