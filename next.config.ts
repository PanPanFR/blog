import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["geist"],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [360, 640, 768, 1024, 1280],
    imageSizes: [64, 128, 256, 512],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withMDX(nextConfig);
