import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Tells Next.js to export static HTML/CSS/JS
  images: {
    unoptimized: true, // Required for static export if using <Image />
  },
  basePath: '/afrina-portfolio', 
};

export default nextConfig;