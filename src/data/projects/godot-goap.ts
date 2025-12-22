import { ProjectCaseStudy } from "../schema";

export const godotGoapCaseStudy: ProjectCaseStudy = {
  id: "godot-goap",
  title: "Godot GOAP Demo",
  sections: [
    {
      id: "overview",
      title: "The Challenge",
      content: `This project is a high-performance technical demonstration of Goal-Oriented Action Planning (GOAP) integrated with a custom Entity Component System (ECS) in Godot 4.5 Mono with C#. The goal was to see how complex AI systems and massive entity counts can scale in a real-time survival-style environment.

The result: 500+ AI planning agents simultaneously chopping trees, crafting campfires, cooking food, and building beds. All of this while maintaining smooth performance.`,
      image: {
        src: "/goap_many_agents.png",
        alt: "500+ AI agents running simultaneously in the demo",
        caption: "500+ AI planning agents executing complex multi-step plans in real-time"
      }
    },
    {
      id: "performance",
      title: "Performance Results",
      content: `The AI planner scales linearly with the number of concurrent agents. In my tests, the system achieved a throughput of approximately 76,500 agents per second, with an average planning cost of just 0.020ms per plan.

The ECS logic update loop is decoupled from rendering, allowing the simulation to remain stable even as entity counts push into the hundreds of thousands. This separation was critical. Without the decoupling, the rendering overhead would have bottlenecked the entire system.`,
      gallery: [
        {
          src: "/goap_perf_graph.png",
          alt: "GOAP planner performance graph showing linear scaling",
          caption: "GOAP AI Throughput: ~76,500 plans/second with 0.020ms average planning time"
        },
        {
          src: "/goap_ecs_graph.png",
          alt: "ECS performance graph showing entity scalability",
          caption: "ECS scales to hundreds of thousands of entities with decoupled logic/render loops"
        }
      ]
    },
    {
      id: "ecs",
      title: "Custom Entity Component System",
      content: `Entities in this system are not defined by inheritance. Instead, each Entity is a lightweight container that gains its identity and behavior through composition. This is achieved by attaching various IComponent implementations at runtime.

The EntityBlueprint class provides a data-driven way to define entity archetypes. Blueprints can be layered using a base-chaining pattern, where a derived blueprint inherits tags, components, and mutators from its parent:

BaseEntity → Entity2D → EmbodiedEntity → NPCBase → Intelligent

Each layer adds or overrides components. A Wanderer NPC simply derives from NPCBase and adds a WanderBehavior component, while an Intelligent NPC adds UtilityGoalSelector and AIGoalExecutor components instead. This approach avoids deep class hierarchies and allows for flexible, mix-and-match entity construction.

This separation let me decouple Utility-based AI Goal selection from GOAP-based AI goal planning and execution while still sharing information between the different systems.`,
    },
    {
      id: "rendering",
      title: "Scene Tree Bypass Renderer",
      content: `Standard Godot Node-based rendering is too slow for 10,000+ active agents. Each Node in Godot's scene tree carries significant overhead. This includes memory allocations, signal connections, and per-frame processing.

I built a custom sprite renderer using the RenderingServer API directly, bypassing the high-level scene tree entirely. This immediate-mode renderer:

• Batches all entity sprites into a single draw call
• Uses _Draw() to render directly to the viewport
• Caches shader parameters to avoid redundant state changes
• Implements lazy sorting to minimize per-frame work

By avoiding node instantiation entirely, the renderer handles massive entity counts without the memory and CPU overhead that comes with Godot's scene tree.`,
      image: {
        src: "/goap_4k_demo.png",
        alt: "4K screenshot showing a single agent executing a complex plan",
        caption: "A single agent executing a plan to satisfy its hunger goal. This includes gathering, cooking, and eating"
      }
    },
    {
      id: "planner",
      title: "Two-Stage GOAP Planner",
      content: `The planner uses a two-stage approach to efficiently search for action plans:

Stage 1: Relevance Pruning (Backward Dependency Analysis)
Before searching, the planner analyzes all available steps to determine which ones are relevant to the goal. It starts by identifying steps whose effects directly satisfy goal facts, then works backward to find steps that enable those goal-achieving steps (transitive closure). Any step that doesn't contribute to the goal directly or indirectly is pruned from the search space.

In practice, this pruning is significant. The current demo has 23 total possible steps. But the dependency analysis can reduce it to just 5 steps for "satisfy hunger" or 2 steps for "rest."

Stage 2: Forward A* Search
Since step 1 created an optimized step set, the planner runs a standard A* search from the initial world state toward the goal state. Each node in the search represents a world state, and edges are the pruned steps. The heuristic estimates remaining cost based on unsatisfied goal facts.

Numeric Reasoning via Implicit Requirements
To handle integer-based facts (like inventory counts), the planner derives implicit requirements from producer steps. If a goal requires "has cooked food" and the step to cook food requires "raw food count >= 1", the planner infers that acquiring raw food is a sub-goal.`,
    },
    {
      id: "methodology",
      title: "Development Process",
      content: `This project was built through iterative profile-driven optimization. Architectural decisions were made based on my cross-engine experience in the Unity Engine, while low-level optimization techniques were researched and implemented systematically.

Development process:
• Profile first, optimize second. Every change was measured
• Buffer reuse, shader parameter caching, lazy sorting came from profiler data
• The custom renderer and ECS architecture came from my experience building similar systems in Unity Engine

Attribution: The GOAP pruning strategy was implemented after it was suggested by GPT 5.1 Codex at "high" reasoning level in Cursor. Many optimization techniques came from research based on profiler data.`,
    }
  ]
};
