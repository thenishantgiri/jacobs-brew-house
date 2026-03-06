import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
