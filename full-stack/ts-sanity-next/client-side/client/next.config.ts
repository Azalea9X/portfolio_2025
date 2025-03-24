import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Custom Next.js configuration options
   */
  reactStrictMode: true,
  images: {
    /**
     * Allow loading images from remote sources
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**", // Allow all paths under cdn.sanity.io
      },
      {protocol: "https", 
        hostname: "https://slqsfm7w.apicdn.sanity.io", 
        pathname: "**" // Allow all paths under https://slqsfm7w.apicdn.sanity.io/ Testing testing testing one two three testing testing testing
      }
    ],
  },
};

export default nextConfig;