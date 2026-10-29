import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  // The card is dark, so use the dark-theme accent
  const accent = `rgb(${site.accentDark.split(" ").join(",")})`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #080c16 0%, #0f1e3a 100%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 80,
            width: 320,
            height: 320,
            borderRadius: 999,
            background: accent,
            filter: "blur(80px)",
            opacity: 0.6,
          }}
        />
        <div style={{ fontSize: 24, letterSpacing: 8, color: accent, textTransform: "uppercase" }}>{site.location}</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16, letterSpacing: -3 }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 8 }}>
          {site.title} · {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
