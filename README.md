# Shifana Siddieeq — Portfolio

3D interactive portfolio built with Next.js 15, React Three Fiber, GSAP and Tailwind.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content
Everything lives in `data/portfolio.ts`. Search for `TODO` to find placeholders
(email, LinkedIn, Brototype bullets, a personal project). Change the accent
colour by editing `site.accent` in the same file.

## Contact form (optional)
Create `.env.local` with:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Without a key the form shows an error asking visitors to email you directly.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo. Defaults are correct.
3. Add env vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
4. Deploy. Every push to `main` redeploys.

## Structure
```
app/            layout, page, API route, sitemap, OG image
components/
  canvas/       3D scenes (lazy-loaded): HeroScene, SkillsSphere, Globe
  sections/     Navbar → Hero → About → Skills → Experience → Projects → Education → Contact → Footer
  ui/           Cursor, MagneticButton, TiltCard, SplitText, Reveal, ThemeToggle
  providers/    ThemeProvider, SmoothScroll (Lenis)
data/           portfolio.ts — all content
hooks/          useDeviceTier (3D quality tiers), useReducedMotion
```
