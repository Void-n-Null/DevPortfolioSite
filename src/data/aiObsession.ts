export interface AIObsessionEntry {
  id: string;
  content: string;
  links?: {
    text: string;
    href: string;
  }[];
  featured?: {
    video?: {
      src: string;
      poster?: string;
    };
    videoCaption?: string;
    videoCaptionLinks?: {
      text: string;
      href: string;
    }[];
    additionalContent?: string;
  };
}

export const aiObsession: AIObsessionEntry[] = [
  {
    id: "ai-fascination",
    content: `I've been fascinated by AI since before ChatGPT dropped in late 2022. I was experimenting with GPT-3 Davinci back in high school. When LLMs started getting good, I was hooked. I wanted to use AI Everywhere!`,
  },
  {
    id: "jarvis-assistant",
    content: `Back in my senior year of high school, I taught myself Python to build a Jarvis-style voice assistant. Used an existing PyTorch library for voice recognition, tweaked it, and trained it with custom data through a lot of trial and error. This was before LLMs were popular or small enough to run on hardware. So it was really just something that would react to a certain key word, with a bit of ML to infer what you might have been trying to say.It barely worked, but I learned in depth about Python and NLP fundamentals at the same time.`,
  },
  {
    id: "autogpt",
    content: `In April 2023, I contributed to AutoGPT during its early explosive growth phase. This was pre-function-calling, pre-thinking models so GPT-4 had to "think" by being given structure to make decisions and then output JSON tool calls that the system would parse and execute. \n\n I built a recursive summarization system for compressing long documents to fit within the limited 16k token context window, and I added Selenium-based web search capabilities.The models at that point were expensive and not very smart, so it was a lot of careful trial and error to avoid spending $20 by accidentally making it go into an infinite loop or on a tangent.\n\n
    I got deep into the codebase, being exposed to the early examples of what is now the standard agent loop (think -> justify -> output JSON -> execute -> observe), the tool execution system, and how it managed context across iterations. I got to sit in and contribute ideas and development philosophies durring meetings with other contributors and the creator of the project, Toran Bruce Richards. It was a star moment for me, and I think it gave me a more in depth understanding of how AI agents work and how to build them. 
    \n\n Below is a demo video I made for the project at the time.`,
    links: [
      {
        text: "AutoGPT", 
        href: "https://github.com/Significant-Gravitas/AutoGPT",
      },
    ],
    featured: {
      video: {
        src: "/autogpt-blake-demo.mp4",
        poster: "/autogpt-demo-poster.jpg",
      },
      videoCaption: `My demo video was featured in AutoGPT's official README for several months during development. Despite the rough audio quality from my laptop mic.`,
      videoCaptionLinks: [
        {
          text: "AutoGPT's official README",
          href: "https://github.com/Significant-Gravitas/AutoGPT/tree/self-feedback-rough-example",
        },
      ],
      additionalContent: `AutoGPT ended up becoming a landmark project. It's still the 24th most starred repository on GitHub. My contributions weren't massive in terms of lines of code, but being in those early conversations about the future of AI agents shaped how I think about this space. I'm still genuinely passionate about Agentic systems like AutoGPT, Claude Code, Cursor, and other tools that are pushing the boundaries of what AI can do.`,
    },
  },
  {
    id: "ai-in-dev",
    content: "These days, I use AI extensively in my own development. Cursor, Claude Code, Windsurf, and other tools are part of my daily workflow. I make the architectural decisions and design the systems; AI helps with implementation. I'm upfront about this because it's how modern development works, and honestly, you'd probably notice anyway. The difference is I can explain every choice in my codebase because I made them. \n\n I only \"Vibe Code\"™ things that are private tools for myself. Anything that users will use would make me paranoid if I left it up to AI. I've been coding as a hobby since 2017, long before AI became useful as an accelerator. So I avoid using it as a mental replacement."
  }
];
