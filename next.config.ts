import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    authInterrupts: true,
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
  },
<<<<<<< HEAD
  cacheComponents: true,
=======
>>>>>>> parent of 6481a87 (next version upgraded)
};

export default nextConfig;
