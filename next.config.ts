import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://lastfm.freetls.fastly.net/**")],
  },
};

export default nextConfig;
