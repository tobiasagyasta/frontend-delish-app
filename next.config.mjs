/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
      },
      //i.imgur.com
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true, // Enables SVG support
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Adds security constraints
  },
};

export default nextConfig;
