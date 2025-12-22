import { siCursor, siOpenrouter } from "simple-icons";
import { ContentSection, ContentEntry } from "./schema";

export const aiObsessionSections: ContentSection[] = [
  {
    id: "curiosity",
    title: "Early curiosity (pre-ChatGPT)",
    icon: { kind: "simple", icon: siOpenrouter },
    entries: [
      {
        id: "ai-fascination",
        content: `I've been obsessed with AI since before it was mainstream. Back in high school, I was experimenting with GPT-3 Davinci through the API, trying to figure out how to integrate language models into my projects. I built that voice assistant in Python because I wanted AI everywhere, even when the tech wasn't quite ready.\n\nWhen ChatGPT dropped in late 2022, I was stunned. The jump in capability was massive. I immediately dove in and spent months learning prompt engineering, tokenization, context window management, and all the logistics of working with LLMs. I was thrilled to finally have access to models powerful enough to build the kinds of systems I'd been imagining.`,
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
        content: `In April 2023, I contributed to AutoGPT during its explosive early growth. This was before function calling, before thinking models. GPT-4 had to "think" by outputting structured JSON tool calls that the system would parse and execute.\n\nI built a recursive summarization system to compress long documents into the 16k token context window, and I added Selenium-based web search. The models were expensive and not very smart, so it took careful trial and error to avoid burning $20 on an agent stuck in an infinite loop.\n\nI got deep into the codebase and saw early versions of what's now the standard agent loop: think, justify, output JSON, execute, observe. I sat in meetings with other contributors and the project creator, Toran Bruce Richards, contributing ideas about the future of AI agents. It was a defining moment. I got to help shape a project that now has 180k stars on GitHub.\n\nBelow is a demo video I made at the time.`,
        links: [
          {
            text: "AutoGPT",
            href: "https://github.com/Significant-Gravitas/AutoGPT",
          },
        ],
        featured: {
          video: {
            src: "/autogpt-blake-demo.mp4",
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
        content: `I use AI extensively in my development workflow. Cursor, Claude Code, and Windsurf are daily tools.\n\nI'm upfront about this because it's the reality of modern development. I'm not a developer who just prompts until something works. I'm not afraid to use AI because I make sure I can defend every choice, and every decision in my codebase. I know why it's structured the way it is. I only "vibe code" private tools for myself. Anything users touch makes me paranoid if I let AI drive. I've been writing code as a hobby since 2017, long before AI was useful. I use it as a code accelerator, a code reviewer, not a replacement for understanding and purposeful design.\n\nIt's good though: AI has turned every project into a learning opportunity. If I encounter a new library, run into a new concept, or an obscure problem I don't understand, I use AI to explain the underlying principles and show me examples. It has fundamentally shortened my time to learn any new technology. It's \"Search Stack-Overflow\" on steroids. \n\n My personal favorite tool is Cursor, because it's still a fully-featured IDE with all the tools I need to build anything I want. The pricing is reasonable for a professional tool, and the agent is well designed and relatively bug-free. But I've also used Windsurf, Claude Code, Gemini CLI, OpenAI Codex, and other tools extensively. Though I heavily prefer Cursor.`,
      },
    ],
  },
];

// Backwards-compatible export (flattened) in case other components still rely on it.
export const aiObsession: ContentEntry[] = aiObsessionSections.flatMap(
  (section) => section.entries
);
