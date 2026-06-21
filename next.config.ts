import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framemark.vam.ac.uk',
      },
    ],
  },
}

export default nextConfig
