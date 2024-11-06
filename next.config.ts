import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps identify potential issues by running extra checks in development
  images: {
    domains: ["example.com"], // Allows images to be served from specific domains
  },
};

export default nextConfig;
