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

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: false, // use true if permanent
      },
    ];
  },
};

export default nextConfig;
