import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://i.pravatar.cc/150?img=1')],
  },
}

export default nextConfig;
