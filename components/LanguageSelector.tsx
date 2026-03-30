'use client'

import React, { useState } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'inline'
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = ''
}) => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'zh', name: '中文', dir: 'ltr' },
    { code: 'ug', name: 'ئۇيغۇرچە', dir: 'rtl' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              language === lang.code
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="切换语言"
      >
        <Globe size={16} />
        <span className="font-medium">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
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
        </>
      )}
    </div>
  )
}

export default LanguageSelector