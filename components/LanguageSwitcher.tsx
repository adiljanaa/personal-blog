'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ug', name: 'ئۇيغۇرچە', flag: '🇨🇳' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe size={16} />
        <span className="font-medium">
          {currentLanguage?.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'zh' | 'ug')
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 ${
                  language === lang.code 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}