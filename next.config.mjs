/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn3.futbin.com' }
    ]
  }
}
export default nextConfig
