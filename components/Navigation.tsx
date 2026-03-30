'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/components/ThemeProvider'
import { 
  Home, 
  BookOpen, 
  Tag, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Globe
} from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, language, setLanguage, dir } = useLanguage()
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: '/', icon: <Home size={18} />, label: t('nav.home') },
    { href: '/articles', icon: <BookOpen size={18} />, label: t('nav.articles') },
    { href: '/tags', icon: <Tag size={18} />, label: t('nav.tags') },
    { href: '/about', icon: <User size={18} />, label: t('nav.about') },
  ]

  const languages = [
    { code: 'zh', name: '中文', dir: 'ltr' },
    { code: 'ug', name: 'ئۇيغۇرچە', dir: 'rtl' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav 
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {t('site.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Globe size={16} />
                <span className="font-medium">
                  {languages.find(lang => lang.code === language)?.name}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code 
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? t('actions.switchLight') : t('actions.switchDark')}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMenuOpen ? t('actions.closeMenu') : t('actions.openMenu')}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="flex space-x-3 px-4 py-2">
                {/* Mobile Language Switcher */}
                <div className="flex-1">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={theme === 'dark' ? t('actions.switchLight') : t('actions.switchDark')}
                >
                  {theme === 'dark' ? (
                    <Sun size={18} className="text-yellow-500" />
                  ) : (
                    <Moon size={18} className="text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation