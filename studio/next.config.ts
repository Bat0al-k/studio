import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "csspicker.dev",
        pathname: "/api/image/**",
      },
    ],
  },
};

export default nextConfig;
