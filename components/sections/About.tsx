import Image from "next/image";
import { about, site } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 className="h2">{about.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-line/10">
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted md:col-span-7">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line/10 pt-8">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-4xl font-semibold text-fg">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
