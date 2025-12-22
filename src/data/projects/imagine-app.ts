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

I built Imagine App to solve these problems by creating an intelligent assistant that can search, analyze, and recommend products conversationally. It's powered by the same public APIs that Best Buy makes available to for integration into third-party applications.`,
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
      title: "600+ LLM Models via Open Router",
      content: `Implementing OAuth PKCE for OpenRouter in a Flutter environment while interfacing with 600+ models was a serious challenge. The security requirements for Flutter's webview almost made me give up and just ask the user to paste an API key. But I eventually got it working with a robust abstraction layer. The authentication flow works like this:

1. App generates a code verifier and challenge
2. User is redirected to OpenRouter's auth page
3. After authorization, app receives an authorization code via deep link
4. Authorization code is exchanged for an API key
5. Key is stored securely using flutter_secure_storage

This lets users bring their own OpenRouter account and choose from any available model. The app uses the OpenRouter API to authenticate with the user's account and then uses the API key to make requests to the OpenRouter API. This BYOK approach lets users leverage their existing OpenRouter credits, eliminating the need to manage API costs on our side, which is essential for an open-source tool.`,
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

The goal was to focus my time on the interesting architectural problems. This includes how to structure an agentic system and how to design clean API clients. While letting AI handle the more routine frontend work.`,
    }
  ]
};
