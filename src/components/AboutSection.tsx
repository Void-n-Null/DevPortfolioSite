export function AboutSection() {
  return (
    <section id="about" className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">About</p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] max-w-5xl">
            Self-taught, AI-obsessed.
          </h2>
        </div>

        {/* Developer Journey */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-[200px,1fr] gap-8 lg:gap-16">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-primary/80 lg:sticky lg:top-32">Developer Journey</h3>
            </div>
            
            <div className="space-y-12 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              <p>
                I got my start with <a href="https://scratch.mit.edu/" className="text-primary hover:underline">Scratch</a> around age 11. Nothing fancy, just dragging blocks around trying to make a platformer that didn&apos;t suck. I spent way too many hours on it, but that&apos;s where I learned the basics: loops, conditionals, the idea that you could tell a computer what to do and it would actually listen.
              </p>
              
              <p>
                By 14, I had moved to Unity and C#. My first real project was a top-down zombie shooter that I was convinced would be the next big indie hit. It wasn&apos;t. But I learned more from that half-finished game than I did from any tutorial. That&apos;s kind of been my pattern ever since: I learn fastest when I&apos;m building something I actually want to exist.
              </p>
              
              <p>
                Since 2018, I&apos;ve been active in various developer communities. I&apos;ve made mods for games like RimWorld and Valheim, built websites for small businesses, prototyped game demos that never saw the light of day, and contributed to open source projects when something caught my interest. I like variety. I like solving problems I haven&apos;t seen before.
              </p>
              
              <p>
                If I&apos;m being honest, I love the early stages of a project almost as much as finishing it. There&apos;s something about sketching out an architecture, debating trade-offs, and figuring out how all the pieces fit together that just clicks for me.
              </p>
            </div>
          </div>
        </div>

        {/* AI Obsession */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-[200px,1fr] gap-8 lg:gap-16">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-primary/80 lg:sticky lg:top-32">AI Obsession</h3>
            </div>
            
            <div className="space-y-12 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              <p>
                I&apos;ve been fascinated by AI since before GPT-3.5 dropped in late 2021. The idea of machines that could reason, even in a limited way, always felt like science fiction becoming real. When LLMs started getting good, I was hooked.
              </p>
              
              <p>
                Back in my senior year of high school, I taught myself Python specifically to build a &quot;Jarvis&quot; style voice assistant. This was pre-LLM, so I was cobbling together speech recognition libraries with a basic PyTorch NLP model that matched my voice commands to a predefined list of actions. It barely worked, but I learned a ton about how these systems are actually built under the hood.
              </p>
              
              <p>
                In April 2023, I got the chance to work with Toran Bruce Richards and other early contributors on{" "}
                <a href="https://github.com/Significant-Gravitas/AutoGPT" className="text-primary hover:underline">AutoGPT</a>. 
                This was during the project&apos;s explosive early growth, when we were all figuring out what agentic AI could even look like. I contributed code, participated in architecture discussions, and helped shape some of the early thinking around how autonomous agents should handle tool use and memory.
              </p>
              
              <p>
                AutoGPT ended up becoming a landmark project. It&apos;s still the 24th most starred repository on GitHub. My contributions weren&apos;t massive in terms of lines of code, but being in those early conversations about the future of AI agents shaped how I think about this space. I genuinely believe we&apos;re still in the early innings of what&apos;s possible.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-16 border-t border-border/20">
          <div className="group">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Specialty</p>
            <p className="text-foreground text-xl font-medium mb-3">AI Agent Systems</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Planning architectures, tool orchestration, context management
            </p>
          </div>
          <div className="group">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Core Stack</p>
            <p className="text-foreground text-xl font-medium mb-3">C# / .NET</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Backends, game engines, high-performance systems
            </p>
          </div>
          <div className="group">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Also Fluent</p>
            <p className="text-foreground text-xl font-medium mb-3">Python, TypeScript</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI tooling, web apps, rapid prototyping
            </p>
          </div>
          <div className="group">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Approach</p>
            <p className="text-foreground text-xl font-medium mb-3">Iteration is Innovation</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Same concept, different contexts. That&apos;s how you find novel solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

