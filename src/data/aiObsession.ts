import { siCursor, siOpenrouter, siPytorch } from "simple-icons";
import { ContentSection, ContentEntry } from "./schema";

export const aiObsessionSections: ContentSection[] = [
  {
    id: "curiosity",
    title: "Curiosity (pre-ChatGPT)",
    icon: { kind: "simple", icon: siOpenrouter },
    entries: [
      {
        id: "ai-fascination",
        content: `I've been fascinated by AI since before ChatGPT dropped in late 2022. I was experimenting with GPT-3 Davinci back in high school. When LLMs started getting good, I was hooked. I wanted to use AI everywhere.`,
      },
    ],
  },
  {
    id: "pytorch",
    title: "Python + PyTorch (voice assistant)",
    icon: { kind: "simple", icon: siPytorch },
    entries: [
      {
        id: "jarvis-assistant",
        content: `Back in my senior year of high school, I taught myself Python to build a Jarvis-style voice assistant. I used an existing PyTorch library for voice recognition, tweaked it, and trained it with custom data through a lot of trial and error.\n\nThis was before LLMs were popular or small enough to run on consumer hardware. So it was really just something that would react to a certain keyword, with a bit of ML to infer what you might have been trying to say. It barely worked, but I learned a lot about Python and NLP fundamentals at the same time.`,
        metadata: {
          date: "2021-2022",
        },
      },
    ],
  },
  {
    id: "autogpt",
    title: "AutoGPT contributor (Apr 2023)",
    icon: { kind: "image", src: "/autogpt.webp", alt: "AutoGPT" },
    entries: [
      {
        id: "autogpt",
        content: `In April 2023, I contributed to AutoGPT during its early explosive growth phase. This was pre-function-calling and pre-thinking-models, so GPT-4 had to "think" by being given structure to make decisions and then output JSON tool calls that the system would parse and execute.\n\nI built a recursive summarization system for compressing long documents to fit within the limited 16k token context window, and I added Selenium-based web search capabilities. The models at that point were expensive and not very smart, so it took careful trial and error to avoid spending $20 because an agent wandered into an infinite loop.\n\nI got deep into the codebase and saw early versions of what is now the standard agent loop (think → justify → output JSON → execute → observe), the tool execution system, and how it managed context across iterations. I also got to sit in and contribute ideas during meetings with other contributors and the creator of the project, Toran Bruce Richards. It was a star moment for me, and it gave me a much deeper understanding of how AI agents work and how to build them.\n\nBelow is a demo video I made for the project at the time.`,
        links: [
          {
            text: "AutoGPT",
            href: "https://github.com/Significant-Gravitas/AutoGPT",
          },
        ],
        featured: {
          video: {
            src: "/autogpt-blake-demo.mp4",
            poster: "/autogpt.webp",
          },
          videoCaption: `My demo video was featured in AutoGPT's official README for several months during development. Despite the rough audio quality from my laptop mic.`,
          videoCaptionLinks: [
            {
              text: "AutoGPT's official README",
              href: "https://github.com/Significant-Gravitas/AutoGPT/tree/self-feedback-rough-example",
            },
          ],
          additionalContent: `AutoGPT ended up becoming a landmark project, and it's now one of the most starred AI agent repositories on GitHub (~180k stars as of late 2025). My contributions weren't massive in terms of lines of code, but being in those early conversations about the future of AI agents shaped how I think about this space. I'm still genuinely passionate about agentic systems like AutoGPT, Claude Code, Cursor, and other tools that are pushing the boundaries of what AI can do.`,
        },
      },
    ],
  },
  {
    id: "workflow",
    title: "AI in my daily workflow",
    icon: { kind: "simple", icon: siCursor, style: { color: "#FFFFFF" } },
    entries: [
      {
        id: "ai-in-dev",
        content: `These days, I use AI extensively in my own development. Cursor, Claude Code, Windsurf, and other tools are part of my daily workflow. I make the architectural decisions and design the systems; AI helps with implementation. I'm upfront about this because it's how modern development works, and honestly, you'd probably notice anyway. The difference is that I can explain every choice in my codebase because I made them.\n\nI only "vibe code" things that are private tools for myself. Anything that users will touch would make me paranoid if I left it up to AI. I've been coding as a hobby since 2017, long before AI became useful as an accelerator, so I avoid using it as a mental replacement.`,
      },
    ],
  },
];

// Backwards-compatible export (flattened) in case other components still rely on it.
export const aiObsession: ContentEntry[] = aiObsessionSections.flatMap(
  (section) => section.entries
);
