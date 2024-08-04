/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
      },
    ],
  },
}

export default nextConfig
