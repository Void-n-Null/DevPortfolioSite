import { ProjectCaseStudy } from "../schema";

export const rebangCaseStudy: ProjectCaseStudy = {
  id: "rebang",
  title: "Rebang",
  sections: [
    {
      id: "origin",
      title: "How It Started",
      content: `I was watching Theo's (t3.gg) YouTube channel when he dropped a video about "unduck". Unduck was his solution to DuckDuckGo's painfully slow bang redirects. The core insight was simple: DDG does redirects server-side, and their DNS isn't great. So why not do it all client-side? Ship the bang database as JavaScript, cache it once, and your browser handles everything locally.

Unduck worked. But watching the video, I kept thinking about what it was missing. No UI, not even a search bar! It was just something for your browser to use as a search engine. No way to add your own bangs. Just DuckDuckGo's database. And that TypeScript file with all the bangs? Unoptimized and huge.

So I forked it.`,
    },
    {
      id: "building-ui",
      title: "Building the Interface",
      content: `The first thing I did was build a real UI. Unduck was great for the browser's search bar, but I wanted a destination. I used React + Vite + Tailwind to build a clean, dark-themed search interface with smart autocomplete. 

I wanted it to feel like a real search engine, where as soon as you type '!', you get a list of every available shortcut. It turned the project from a background script into a tool you could actually interact with.`,
      image: {
        src: "/rebang_screenshot.png",
        alt: "Rebang interface with search bar and autocomplete",
        caption: "The UI I built: React + Vite + Tailwind with smart autocomplete as you type"
      }
    },
    {
      id: "custom-bangs",
      title: "Making it Personal",
      content: `Once I had a UI, I realized I wanted my own shortcuts. There are internal tools, specific documentation pages, and niche sites I visit daily that DuckDuckGo would never include. 

I added support for custom bangs using localStorage. You can define your own trigger, name, and URL pattern (using %s for the query). They're stored locally in your browser and take priority over the built-in ones. This was the feature that actually made me start using it as my daily driver.`,
    },
    {
      id: "kagi-and-optimization",
      title: "The Ultimate Database",
      content: `Later on, I learned about Kagi and their own set of bangs. I realized that combining both sources would create the ultimate search shortcut tool. 

But merging 13,000+ bangs from two different sources created a massive data problem. I had to build a system to deduplicate them.
I took the opportunity to optimize the database to make it smaller and faster to load. Before I was using the same giant typescript file that theo had created. But it was a lot of repetitive data, and while the file size alone was not that bad, it felt like if I could optimize it, I should.

I restructured the entire database into an array-based format with category lookup tables. The common bangs load instantly, and the rest lazy-load in the background. The result was a database that was 35% smaller and better organized than what I started with.`,
    },
    {
      id: "keeping-it-fresh",
      title: "Automated Updates",
      content: `I didn't want the database to become a stale snapshot. DuckDuckGo and Kagi add new bangs all the time. 

I set up a GitHub Actions workflow that runs on the 1st of each month. It fetches fresh data from both sources, merges them, runs my optimization scripts, and deploys the updated database automatically. It's set-and-forget. It's not the most up-to-date if either source is constantly adding new bangs, but from what I've seen, they tend to not add new bangs super frequently. The tool stays current without me touching it.`,
    },
    {
      id: "why-client-side",
      title: "Why Client-Side Matters",
      content: `The whole point of this approach is speed. When you use DuckDuckGo's bangs, your query goes to their servers, they process it, then redirect you. That's a full round trip that depends on their infrastructure.

With Rebang, everything happens in your browser. The bang database is cached locally as JavaScript. When you type a bang, the lookup and redirect happen instantly without any network requests. It's the difference between waiting for a server response and having the answer already in memory.

This is why the database optimization mattered. Every kilobyte saved means faster initial load and less memory footprint. But after that first load, using bangs is practically instantaneous.`,
    },
    {
      id: "reflection",
      title: "The Takeaway",
      content: `This project was about taking a clever idea and turning it into a product I would use daily. Theo proved the concept of client-side redirects, but I wanted to make it a product I loved using. 

It taught me a lot about data optimization and the value of "completing" a tool. Adding a UI, custom bangs, and merging sources turned a clever script into a daily utility.`,
    }
  ]
};
