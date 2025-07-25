import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = withBundleAnalyzer({
  output: 'standalone',
  trailingSlash: false,
  images: {
    // Next.js will now optimize images and serve AVIF/WebP automatically
  }
});

export default nextConfig;
