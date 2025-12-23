import { ProjectCaseStudy } from "../schema";

export const imagineAppCaseStudy: ProjectCaseStudy = {
  id: "imagine-app",
  title: "Imagine App",
  sections: [
    {
      id: "problem",
      title: "The Problem",
      content: `While working as a sales associate at Best Buy, I frequently encountered situations where:

• Customers needed quick product comparisons across different categories
• Finding specific products by barcode or SKU was tedious through internal systems
• Answering detailed specification questions required navigating multiple screens
• Recommending products based on customer needs meant mentally juggling dozens of options

I built Imagine App to solve these problems by creating an intelligent assistant that can search, analyze, and recommend products conversationally. It's powered by the same public APIs that Best Buy makes available for integration into third-party applications.`,
    },
    {
      id: "agentic-architecture",
      title: "Agentic Loop Architecture",
      content: `The core of Imagine App is the AgentRunner, which implements a classic agentic loop:

User Message → LLM → Tool Calls? → Execute Tools → LLM → ... → Final Response

The runner doesn't just send prompts. It manages a complete state machine for multi-turn tool interactions:

1. Sends the conversation history plus available tools to the LLM
2. Parses any tool calls from the response
3. Executes each tool and collects results
4. Feeds results back to the LLM for the next iteration
5. Repeats until the LLM responds without tool calls (max 10 iterations)

With just two tools (search_products and analyze_product), the AI gains an effortless ability to ground itself on real Best Buy product info, avoiding hallucinations entirely.`,
      gallery: [
        {
          src: "/imagine_chat.png",
          alt: "Imagine App chat interface showing AI conversation with product cards",
          caption: "Chat interface with rich product cards, AI responses, and tool execution indicators"
        },
        {
          src: "/imagine_landing.jpg",
          alt: "Imagine App landing screen showing the clean, dark-themed mobile interface",
          caption: "Clean, intuitive mobile UI with dark theme and easy access to chat and barcode scanning"
        }
      ]
    },
    
    {
      id: "api-design",
      title: "Fluent Builder API",
      content: `The BestBuyClient provides a fluent builder API for constructing complex product queries. Instead of wrestling with URL parameters and manual encoding, queries read like natural language:

client.products()
    .search("gaming laptop")
    .priceRange(min: 800, max: 1500)
    .byManufacturer("ASUS")
    .onSale()
    .minRating(4.0)
    .sortBy(ProductSort.customerReviewAverage)
    .execute()

The client handles request construction with proper URL encoding, response parsing into typed Dart models, error handling with specific exception types, and timeout/retry logic. All of this is abstracted away so the agent can focus on finding the right products.`,
    },
    {
      id: "openrouter",
      title: "300+ LLM Models via Open Router",
      content: `Implementing OAuth PKCE for OpenRouter in a Flutter environment was a serious challenge. The security requirements for Flutter's webview almost made me give up and just ask the user to paste an API key. But I eventually got it working with a robust abstraction layer. The authentication flow works like this:

1. App generates a code verifier and challenge
2. User is redirected to OpenRouter's auth page
3. After authorization, app receives an authorization code via deep link
4. Authorization code is exchanged for an API key
5. Key is stored securely using flutter_secure_storage

This flow lets users bring their own OpenRouter account and choose from any available model with just 2 clicks (if they are already logged in). The BYOK approach lets users leverage their existing OpenRouter credits, eliminating the need to manage API costs on our side which is especially important for an open-source tool.`,
    },
    {
      id: "methodology",
      title: "Development Methodology",
      content: `This project was built with a clear division of labor:

AI-Assisted (Cursor with Claude):
• Frontend UI/UX design and widget implementation
• Theme and styling decisions
• Markdown rendering and product card layouts

Manual Implementation:
• Agentic architecture (AgentRunner, Tool, ToolRegistry)
• Best Buy API client with fluent builder pattern
• OpenRouter OAuth flow and client
• Tool implementations and prompt engineering
• State management and chat persistence
• Comparison system for product attributes

The goal was to optimize my time by focusing on the architectural problems by hand while offloading things AI could handle. UI and basic widget construction were easy to give AI. API design, prompt engineering, tool implementations, and state management I solved manually.

I stress this because there's a lot of conversation around how much AI to use. I've learned from recent personal projects that overusing AI for things it's not suited for causes a project to spiral into security and functionality issues quickly. Decision-making becomes borderline impossible because without a real understanding of the problem, neither you nor your AI can make well-informed decisions. So I always go in with a plan for where I want to use AI, which lets me manage the project effectively.`,
    },
    {
      id: "utilities",
      title: "More Than Just a Chatbot",
      content: `The agent is the star feature, but it alone wouldn't make this something I'd use over internal tooling. What made Imagine App actually useful was a set of utilities that solved specific friction points I dealt with every shift.
    \n**Barcode Scanner with quick confirmation of product data**

    Point your camera at a UPC, EAN, or Best Buy in-store QR label and get the full product page in under 200ms. It uses a simple API request to quickly and confidently tell if the scanned item is a Best Buy product. The scanner also parses Best Buy's in-store QR codes to extract SKUs directly. The AI is also given a tool to request a scan mid-conversation if it needs data about a product you're holding. It's a small feature, but it makes the agent feel more like a real assistant, especially for less tech-savvy customers.

    **Product Detail Page with real-time stock checks and UX considerations**

    The detail page pulls everything into one place: specs, features, availability, what's in the box, customer reviews, active deals. But the features I actually used most were:
    
    - *Register-Ready Barcode*: The app generates a real, scannable UPC on your screen. Find a product through the AI, then show your phone to the cashier to scan it directly. No hunting for the physical item.
    - *Store Availability*: Real-time stock checks across nearby locations using GPS or manual ZIP code entry.
    - *Ask AI*: One tap sends the product into the chat. The AI focuses on that specific item for follow-up questions.
    - *Copyable IDs*: Tap the SKU, UPC, or model number to copy it instantly. Small thing, but I used this constantly.
    - *Specs you can actually fuzzy search*: Internal tools drove me crazy with the inability to search for specs by name. So I made sure to include fuzzy name matching for specs via search bar. 
    
    **Comparison Engine with algorithmic normalization and LLM powered analysis**
    
    This is where product information and the agent come together in the most powerful way. Customers constantly ask "what's the difference between these two?" The comparison engine solves that:
    
    - Scan products as you walk through the store—each one gets added to a comparison list.
    - The engine normalizes messy product data across categories, filters out identical specs, and highlights only what's different.
    - For numeric specs like price, weight, or battery life, it calculates and marks the "winner" automatically.
    - Unique features get pulled into their own section so you can see at a glance what one product has that the others don't.
    
    The AI can generate these comparisons in seconds using real spec data from the Best Buy API. No more giant tables of specs or reading fine print on product boxes trying to spot differences.`,
    },
    {
      id: "real-world-usage",
      title: "Built for the Sales Floor",
      content: `By leveraging AI-assisted development for the UI layer, I went from concept to production-ready mobile app in 48 hours. It was barely in time for Black Friday, but functional enough to be useful that day.

      The real test wasn't the code. It was whether the app could save time during the highest-pressure sales environment of the year. It did. When customers asked about compatibility between products, spec comparisons across brands, or whether a laptop could handle their specific workload, I had grounded answers in seconds instead of minutes of searching.
      
      But Black Friday was just the proof of concept. I used Imagine App on nearly every shift after that. It became a genuine part of how I helped customers. The agentic architecture meant I could ask natural questions and trust the responses because they were grounded in real inventory data, not hallucinated specs.
      
      That's the lesson I took away from this project. Being a developer isn't just about writing code, it's about having a problem and solving it with the tools at your disposal. I didn't build a demo. I built a tool I used every day.`,
    }
  ]
};
