import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs">Built with Next.js · React Three Fiber · GSAP</p>
      </div>
    </footer>
  );
}
