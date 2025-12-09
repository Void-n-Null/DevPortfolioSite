export interface JourneyEntry {
  id: string;
  content: string;
  layout: "full" | "half";
  links?: {
    text: string;
    href: string;
  }[];
}

export const developerJourney: JourneyEntry[] = [
  {
    id: "scratch-start",
    content: `I got my start with Scratch around age 11. Nothing fancy, just dragging blocks around trying to make a clone of "Cookie Clicker" that didn't suck. I spent way too many hours on it, but that's where I learned programming fundementals.`,
    layout: "full",
    links: [
      {
        text: "Scratch",
        href: "https://scratch.mit.edu/",
      },
    ],
  },
  {
    id: "unity-csharp",
    content: `By 14, I had moved to Unity and C#. My first real project was "Spirit Steve". Which boiled down to a freecam first person game where you fly around a city and can interact with NPCs that are path finding. Learning how to use Unity's pathfinding system was my first real challenge. Most of my Unity projects never saw the light of day, but I learned a lot from those kinds of projects. Over the years, I built 100+ small or incomplete Unity projects. It's not because I abandoned them, but because building is how I learn. Each project taught me something new, and I moved on when I'd explored what I thought was interesting, and learned the skills neccisary to test my ideas.`,
    layout: "full",
  },
  {
    id: "learning-pattern",
    content: `I learned more from building those random projects then I did from any tutorial. That's kind of been my pattern ever since: I learn fastest when I'm building something I actually want to exist. I don't learn well from tutorials, I'm legitimately entertained by the process of programming and itterating. I have spent many sleepless nights fixing something that I had the vision for, but had to develop the skills required to build it, and trial and error was as fun as it was frustrating.`,
    layout: "half",
  },
  {
    id: "dev-communities",
    content: `Since 2018, I've been active in Discord game dev communities. I've made mods for RimWorld and Bloons TD 6 (The BTD6 mods got pretty popular), prototyped game demos that never saw the light of day, and contributed to open source projects when something caught my interest.`,
    layout: "full",
    links: [
      {
        text: "RimWorld",
        href: "https://rimworldwiki.com/",
      },
      {
        text: "Bloons TD 6",
        href: "https://bloons.fandom.com/wiki/Bloons_TD_6",
      },
      {
        text: "The BTD6 mods got pretty popular",
        href: "https://www.youtube.com/watch?v=4zgYe_OleeU",
      }
    ],
  },
  {
    id: "early-stages",
    content: `If I'm being honest, I love the early stages of a project almost as much as finishing it. There's something about sketching out an architecture, debating trade-offs, and figuring out how all the pieces fit together that just clicks for me.`,
    layout: "full",
  },
];
