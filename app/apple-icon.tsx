import { ImageResponse } from "next/og";
import { loadInterTight } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111110",
          color: "#fafaf9",
          fontFamily: "Inter Tight",
          fontSize: 76,
          fontWeight: 600,
          letterSpacing: -4,
        }}
      >
        GM
      </div>
    ),
    { ...size, fonts: await loadInterTight(600) },
  );
}
