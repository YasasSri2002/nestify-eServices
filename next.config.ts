import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
  experimental:{
    authInterrupts: true,
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
