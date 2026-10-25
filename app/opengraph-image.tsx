import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadGeist } from "@/lib/og-font";

export const alt = `${site.name}, ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = [...(await loadGeist(600)), ...(await loadGeist(500))];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fafaf9",
          color: "#111110",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#111110",
            color: "#fafaf9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          GM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: -6, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 40, fontWeight: 500, color: "#5f5e5b", letterSpacing: -1 }}>
            ML Engineer · Applied AI & health-tech
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
