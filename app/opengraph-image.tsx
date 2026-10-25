import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadInterTight } from "@/lib/og-font";

export const alt = `${site.name}, ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The hero photo as a data URL, once public/me.jpg exists. */
function photo() {
  const file = path.join(process.cwd(), "public", site.hero.portrait.src);
  return fs.existsSync(file) ? `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}` : null;
}

export default async function OpengraphImage() {
  const fonts = [...(await loadInterTight(600)), ...(await loadInterTight(500))];
  const me = photo();
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
          fontFamily: "Inter Tight",
        }}
      >
        {me ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={me} width={112} height={112} style={{ borderRadius: 999, objectFit: "cover" }} alt="" />
        ) : (
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
              letterSpacing: -1.2,
            }}
          >
            GM
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: -4.5, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 40, fontWeight: 500, color: "#5f5e5b", letterSpacing: -0.8 }}>
            ML Engineer · Applied AI & health-tech
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
