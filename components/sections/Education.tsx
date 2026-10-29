import { education } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="section !py-16">
      <Reveal>
        <div className="glass flex flex-col gap-4 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Education</p>
            {education.map((e) => (
              <div key={e.degree}>
                <h3 className="font-display text-2xl font-semibold">{e.degree}</h3>
                <p className="text-muted">
                  {e.school} · {e.location}
                  {e.period ? ` · ${e.period}` : ""}
                </p>
              </div>
            ))}
          </div>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent">
            <path d="M22 10 12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
      </Reveal>
    </section>
  );
}
