import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { optimizePackageImports: ["lucide-react"] },
  // Old Flask-site URLs, so existing links and shares keep working
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/experience", destination: "/#about", permanent: true },
      { source: "/skills", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/static/assets/Gokul-Mallabathula-Resume.pdf", destination: "/Gokul-Mallabathula-Resume.pdf", permanent: true },
      { source: "/static/assets/certificate-of-finalist.png", destination: "/certificate-of-finalist.png", permanent: true },
    ];
  },
};

export default nextConfig;
