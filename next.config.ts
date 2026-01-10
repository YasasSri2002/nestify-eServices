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
  cacheComponents: true,
>>>>>>> 6cfcfd506cf653b7593e731cc4e616ef5ebba64a
};

export default nextConfig;
