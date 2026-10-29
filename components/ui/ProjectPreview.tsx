import type { Project } from "@/data/portfolio";

// Illustrated app screens for project cards. Generic sample content only — no real company data.

function Frame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-5 bottom-0 top-6 flex flex-col overflow-hidden rounded-t-2xl border border-b-0 border-line/10 bg-bg/85 shadow-2xl backdrop-blur transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:inset-x-8 sm:top-8">
      <div className="flex items-center gap-1.5 border-b border-line/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-3 truncate rounded-md bg-line/5 px-2 py-0.5 font-mono text-[9px] text-muted">{url}</span>
      </div>
      <div className="min-h-0 flex-1 p-3 text-[9px] leading-tight sm:p-4">{children}</div>
    </div>
  );
}

const tile = "rounded-lg border border-line/10 bg-card/70 p-2";

function Erp() {
  const kpis = [
    { label: "Employees", value: "248" },
    { label: "Active projects", value: "12" },
    { label: "Fleet online", value: "31" },
  ];
  const bars = [40, 62, 48, 75, 58, 88, 70, 95, 66, 80];
  const approvals = [
    { what: "Leave request · Site Ops", state: "Pending", tone: "bg-amber-400/20 text-amber-300" },
    { what: "Variation order VO-014", state: "Approved", tone: "bg-emerald-400/20 text-emerald-300" },
    { what: "PPE issue voucher", state: "Step 2 of 3", tone: "bg-sky-400/20 text-sky-300" },
  ];
  return (
    <Frame url="erp.company.ae/dashboard">
      <div className="flex h-full gap-3">
        <div className="hidden w-20 shrink-0 space-y-1 sm:block">
          {["Dashboard", "HR & Payroll", "Fleet", "Assets", "Projects", "Documents"].map((m, i) => (
            <div key={m} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-accent/25 text-fg" : "text-muted"}`}>
              {m}
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((k) => (
              <div key={k.label} className={tile}>
                <div className="text-muted">{k.label}</div>
                <div className="mt-0.5 font-display text-base font-semibold text-fg">{k.value}</div>
              </div>
            ))}
          </div>
          <div className={`${tile} flex min-h-0 flex-1 flex-col`}>
            <div className="mb-2 flex justify-between text-muted">
              <span>Monthly cost tracking</span>
              <span className="text-emerald-400">▲ 12%</span>
            </div>
            <div className="flex min-h-0 flex-1 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-accent/40 to-accent transition-all duration-500 group-hover:opacity-90"
                />
              ))}
            </div>
          </div>
          {/* Hidden on phones, where the preview is too short for all three panels */}
          <div className={`${tile} hidden space-y-1.5 sm:block`}>
            <div className="text-muted">Approvals</div>
            {approvals.map((a) => (
              <div key={a.what} className="flex items-center justify-between gap-2">
                <span className="truncate text-fg/80">{a.what}</span>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 ${a.tone}`}>{a.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Chat() {
  return (
    <Frame url="erp.company.ae/assistant">
      <div className="space-y-2.5">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-white">
          Whose visas expire this month?
        </div>
        <div className="w-fit max-w-[85%] space-y-1.5">
          <span className="inline-block rounded-md border border-line/10 bg-line/5 px-1.5 py-0.5 font-mono text-[8px] text-muted">
            ⚙ tool · employees.expiringDocuments
          </span>
          <div className="rounded-2xl rounded-bl-sm border border-line/10 bg-card/80 px-3 py-2 text-fg/90">
            4 employees — 2 in Site Ops, 2 in Admin. The earliest expires on the 9th. Want me to notify HR?
          </div>
        </div>
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-white">
          Overtime cost for Project A last week?
        </div>
        <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm border border-line/10 bg-card/80 px-3 py-2.5">
          {[0, 150, 300].map((d) => (
            <span key={d} style={{ animationDelay: `${d}ms` }} className="h-1.5 w-1.5 rounded-full bg-muted motion-safe:animate-bounce" />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Portal() {
  const milestones = [
    { name: "Structure complete", done: true },
    { name: "MEP rough-in", done: true },
    { name: "Fit-out & finishes", done: false },
    { name: "Handover", done: false },
  ];
  return (
    <Frame url="portal.company.ae/projects/tower-b">
      <div className="space-y-2">
        <div className={tile}>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs font-semibold text-fg">Tower B · Fit-out</span>
            <span className="text-emerald-400">68%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/10">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-300" />
          </div>
        </div>
        <div className={`${tile} space-y-1.5`}>
          {milestones.map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-full text-[7px] ${
                  m.done ? "bg-emerald-400/80 text-bg" : "border border-line/20"
                }`}
              >
                {m.done ? "✓" : ""}
              </span>
              <span className={m.done ? "text-muted line-through" : "text-fg/90"}>{m.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className={tile}>
            <div className="text-muted">Drawing A-102</div>
            <div className="mt-0.5 text-fg/90">v3 · updated today</div>
          </div>
          <div className={tile}>
            <div className="text-muted">Next payment</div>
            <div className="mt-0.5 text-fg/90">IPC #6 · in review</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Mentor() {
  const slots = ["Mon 10:00", "Tue 14:30", "Wed 09:00", "Thu 16:00"];
  return (
    <Frame url="mentorship.app/session">
      <div className="flex h-full gap-2">
        <div className="grid flex-1 grid-cols-2 grid-rows-[1fr_auto] gap-2">
          {[
            { initials: "MS", role: "Mentor", tone: "from-blue-500/50 to-indigo-500/30" },
            { initials: "AK", role: "Student", tone: "from-teal-500/50 to-cyan-500/30" },
          ].map((p) => (
            <div key={p.role} className={`relative grid min-h-16 place-items-center rounded-lg bg-gradient-to-br ${p.tone}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-bg/60 font-display text-[10px] font-semibold text-fg">
                {p.initials}
              </span>
              <span className="absolute bottom-1 left-1.5 text-[8px] text-white/80">{p.role}</span>
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400 motion-safe:animate-pulse" />
            </div>
          ))}
          <div className={`${tile} col-span-2`}>
            <div className="mb-1.5 text-muted">Book your next slot</div>
            <div className="flex flex-wrap gap-1">
              {slots.map((s, i) => (
                <span key={s} className={`rounded-md px-1.5 py-1 ${i === 1 ? "bg-accent text-white" : "border border-line/10 text-fg/80"}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`${tile} hidden w-28 shrink-0 space-y-1.5 sm:block`}>
          <div className="text-muted">Chat</div>
          <div className="rounded-md bg-line/5 px-1.5 py-1 text-fg/80">Shared the task repo 👍</div>
          <div className="rounded-md bg-accent/25 px-1.5 py-1 text-fg/90">Thanks! Reviewing now</div>
          <div className="rounded-md bg-line/5 px-1.5 py-1 text-fg/80">Payment received ✓</div>
        </div>
      </div>
    </Frame>
  );
}

const previews: Record<Project["preview"], () => React.JSX.Element> = {
  erp: Erp,
  chat: Chat,
  portal: Portal,
  mentor: Mentor,
};

export function ProjectPreview({ kind }: { kind: Project["preview"] }) {
  const Preview = previews[kind];
  return <Preview />;
}
