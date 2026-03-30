/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
  // PWA相关配置
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // 移除console.log
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 国际化配置
  i18n: {
    locales: ['zh', 'ug'],
    defaultLocale: 'zh',
  },
  // 压缩配置
  compress: true,
  // 生产环境优化
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
  }),
  // 安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig