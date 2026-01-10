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
   cacheComponents: true,
  
};

export default nextConfig;
