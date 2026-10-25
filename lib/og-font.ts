/** Inter Tight for generated images (OG, apple icon). Fetched at build time; falls back to the default font offline. */
export async function loadInterTight(weight: 500 | 600) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return [];
    const data = await (await fetch(url)).arrayBuffer();
    return [{ name: "Inter Tight", data, weight, style: "normal" as const }];
  } catch {
    return [];
  }
}
