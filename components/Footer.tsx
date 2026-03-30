'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Heart, Code, Mail, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const { t, dir } = useLanguage()

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={18} />,
      href: 'https://github.com',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      href: 'https://twitter.com',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: <Mail size={18} />,
      href: 'mailto:contact@example.com',
      color: 'hover:text-red-500'
    }
  ]

  const footerLinks = [
    { href: '/privacy', label: '隐私政策' },
    { href: '/terms', label: '服务条款' },
    { href: '/sitemap', label: '网站地图' },
    { href: '/feed', label: 'RSS订阅' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" dir={dir}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 站点信息 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {t('site.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('site.description')}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Code size={14} className="mr-2" />
              <span>{t('footer.madeWith')}</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              快速链接
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 社交链接 */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              关注我
            </h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Heart size={14} className="mr-1 text-red-500" />
              <span>感谢您的访问</span>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              {t('footer.copyright').replace('2024', currentYear.toString())}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-2">访问量:</span>
              <span className="font-medium">999+</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer