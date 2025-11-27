export function AboutSection() {
  return (
    <section id="about" className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-32 relative">
          <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6 ml-4">About</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.85] max-w-5xl">
            <span className="text-foreground">Self-taught,</span>
            <br />
            <span className="text-gradient">AI-obsessed.</span>
          </h2>
        </div>

        {/* Developer Journey */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-1.5 flex-1 bg-gradient-to-r from-transparent to-border max-w-[100px]" />
            <h3 className="text-xl uppercase tracking-[0.2em] text-primary/80">Developer Journey</h3>
            <div className="h-1.5 flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="space-y-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I got my start with <a href="https://scratch.mit.edu/" className="text-primary hover:underline font-medium">Scratch</a> around age 11. Nothing fancy, just dragging blocks around trying to make a clicker game that didn&apos;t suck. I spent way too many hours on it, but that&apos;s where I learned the basics: loops, conditionals, the idea that you could tell a computer what to do and it would actually listen.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors h-full">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    By 14, I had moved to Unity and C#. My first real project was a top-down zombie shooter that I was convinced would be the next big indie hit. It wasn&apos;t. But I learned more from that half-finished game than I did from any tutorial.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors h-full">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    That&apos;s kind of been my pattern ever since: I learn fastest when I&apos;m building something I actually want to exist. I don&apos;t learn well from tutorials, I&apos;m self taught because I have spent many sleepless nights fixing something that I had the vision for, but had to develop the skills required to build it.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Since 2018, I&apos;ve been active in various developer communities. I&apos;ve made mods for games like RimWorld and Valheim, built websites for small businesses, prototyped game demos that never saw the light of day, and contributed to open source projects when something caught my interest. I like variety. I like solving problems I haven&apos;t seen before.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-primary/20 transition-colors">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  If I&apos;m being honest, I love the early stages of a project almost as much as finishing it. There&apos;s something about sketching out an architecture, debating trade-offs, and figuring out how all the pieces fit together that just clicks for me.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Obsession */}
        <div className="mb-40">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-1.5 flex-1 bg-gradient-to-r from-transparent to-border max-w-[100px]" />
            <h3 className="text-xl uppercase tracking-[0.2em] text-neon-secondary/80">AI Obsession</h3>
            <div className="h-1.5 flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          <div className="space-y-8">
            <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-l from-neon-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className=" bg-black/40 relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-neon-secondary/20 transition-colors">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I&apos;ve been fascinated by AI since before GPT-3.5 dropped in late 2022. The idea of machines that could reason, even in a limited way, always felt like science fiction becoming real. When LLMs started getting good, I was hooked.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="  absolute inset-0 bg-gradient-to-l from-neon-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-black/40 relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-neon-secondary/20 transition-colors">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Back in my senior year of high school, I taught myself Python specifically to build a &quot;Jarvis&quot; style voice assistant. This was pre-LLM, so I was cobbling together speech recognition libraries with a basic PyTorch NLP model that matched my voice commands to a predefined list of actions. It barely worked, but I learned a ton about how these systems are actually built under the hood.
                </p>
              </div>
            </div>

            {/* AutoGPT - Featured */}
            <div className="relative mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-black/40 relative p-8 lg:p-12 rounded-2xl border border-border/30 hover:border-neon-secondary/20 transition-colors">
                  <div className=" space-y-8">
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      In April 2023, I got the chance to work with Toran Bruce Richards and other early contributors on{" "}
                      <a href="https://github.com/Significant-Gravitas/AutoGPT" className="text-primary hover:underline font-medium">AutoGPT</a>. 
                      This was during the project&apos;s explosive early growth, when we were all figuring out what agentic AI could even look like. I contributed code, participated in architecture discussions, and helped shape some of the early thinking around how autonomous agents should handle tool use and memory.
                    </p>
                    
                    {/* Demo Video */}
                    <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50">
                      <video 
                        className="w-full h-auto"
                        controls
                        preload="metadata"
                        poster="/autogpt-demo-poster.jpg"
                      >
                        <source src="/autogpt-blake-demo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="p-4 border-t border-border/30">
                        <p className="text-md text-muted-foreground">
                          My demo video was featured in{" "}
                          <a 
                            href="https://github.com/Significant-Gravitas/AutoGPT/tree/self-feedback-rough-example" 
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            AutoGPT&apos;s official README
                          </a>
                          {" "}for several months during development. Despite the rough audio quality from my laptop mic.
                        </p>
                      </div>
                    </div>

                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      AutoGPT ended up becoming a landmark project—it&apos;s still the 24th most starred repository on GitHub. My contributions weren&apos;t massive in terms of lines of code, but being in those early conversations about the future of AI agents shaped how I think about this space. I&apos;m still genuinely passionate about Agentic systems like AutoGPT, Claude Code, Cursor, and other tools that are pushing the boundaries of what AI can do.
                    </p>
                  </div>
                </div>
                    </div>

          </div>
        </div>

        {/* Skills Grid */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Specialty",
                title: "AI Agent Systems",
                desc: "Planning architectures, tool orchestration, context management",
              },
              {
                label: "Core Stack",
                title: "C# / .NET",
                desc: "Backends, game engines, high-performance systems",
              },
              {
                label: "Also Fluent",
                title: "Python, TypeScript",
                desc: "AI tooling, web apps, rapid prototyping",
              },
              {
                label: "Approach",
                title: "Iteration is Innovation",
                desc: "Same concept, different contexts. That's how you find novel solutions.",
              },
            ].map((skill) => (
              <div 
                key={skill.title}
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 rounded-2xl border border-border/30 hover:border-primary/30 transition-all duration-300 h-full">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-medium">{skill.label}</p>
                  <p className="text-foreground text-xl font-bold mb-3 group-hover:text-primary transition-colors">{skill.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
