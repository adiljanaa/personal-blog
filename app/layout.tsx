import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ThemeProvider from '@/components/ThemeProvider'
import { LanguageProvider } from '@/hooks/useLanguage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '个人博客 - 分享知识与技术',
  description: '一个现代化的个人博客网站，分享技术、生活和思考',
  keywords: ['博客', '技术', '前端开发', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: '博客作者' }],
  creator: '个人博客',
  publisher: '个人博客',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://blog.example.com',
    title: '个人博客 - 分享知识与技术',
    description: '一个现代化的个人博客网站，分享技术、生活和思考',
    siteName: '个人博客',
    images: [
      {
        url: 'https://blog.example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '个人博客',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '个人博客 - 分享知识与技术',
    description: '一个现代化的个人博客网站，分享技术、生活和思考',
    images: ['https://blog.example.com/og-image.png'],
    creator: '@blog_author',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}