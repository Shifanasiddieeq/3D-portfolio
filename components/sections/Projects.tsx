import Image from "next/image";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectPreview } from "@/components/ui/ProjectPreview";

export function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <p className="eyebrow mb-4">Projects</p>
        <h2 className="h2">Selected work.</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={`group ${p.featured ? "md:col-span-2" : ""}`}>
            <TiltCard max={3} className="h-full">
              <article
                className={`glass flex h-full flex-col overflow-hidden rounded-3xl ${
                  p.featured ? (i % 2 ? "lg:flex-row-reverse" : "lg:flex-row") : ""
                }`}
              >
                {/* Visual: real screenshot if provided, otherwise an illustrated app screen */}
                <div
                  className={`relative aspect-[16/10] shrink-0 overflow-hidden bg-gradient-to-br ${p.gradient} ${
                    p.featured ? "lg:aspect-auto lg:min-h-[420px] lg:w-[58%]" : ""
                  }`}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes={p.featured ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ProjectPreview kind={p.preview} />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow">{p.role}</p>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">{p.title}</h3>
                  <p className="mt-2 text-fg/80">{p.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>

                  <ul className="mt-5 space-y-2 text-sm">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 text-[11px]">
                        {s}
                      </span>
                    ))}
                    {p.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className="ml-auto text-sm text-accent underline-offset-4 hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
