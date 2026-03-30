'use client'

import { useState, useEffect, createContext, useContext } from 'react'

type Language = 'zh' | 'ug'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 默认语言
const DEFAULT_LANGUAGE: Language = 'zh'

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// 简单的翻译函数
function getTranslation(key: string, language: Language): string {
  // 简化版本，实际使用时导入完整的翻译文件
  const translations: Record<string, Record<Language, string>> = {
    'nav.home': { zh: '首页', ug: 'باش بەت' },
    'nav.articles': { zh: '文章', ug: 'ماقالىلەر' },
    'nav.tags': { zh: '标签', ug: 'بەلگىلەر' },
    'nav.about': { zh: '关于', ug: 'ھەققىدە' },
    'site.title': { zh: '个人博客', ug: 'شەخسىي بىلوگ' }
  }
  
  return translations[key]?.[language] || key
}

// 语言方向配置
function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ug' ? 'rtl' : 'ltr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [isInitialized, setIsInitialized] = useState(false)

  // 从本地存储加载语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('language') as Language
        if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'ug')) {
          setLanguageState(savedLanguage)
        }
      } catch (error) {
        console.error('Failed to load language from localStorage:', error)
      }
      setIsInitialized(true)
    }
  }, [])

  // 设置语言并保存到本地存储
  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguageState(lang)
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('language', lang)
          // 更新html标签的lang和dir属性
          document.documentElement.lang = lang
          document.documentElement.dir = getLanguageDirection(lang)
        } catch (error) {
          console.error('Failed to save language to localStorage:', error)
        }
      }
    }
  }

  // 初始化html标签的lang和dir属性
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.dir = getLanguageDirection(language)
    }
  }, [language, isInitialized])

  // 翻译函数
  const t = (key: string): string => {
    return getTranslation(key, language)
  }

  // 获取语言方向
  const dir = getLanguageDirection(language)

  // 提供语言上下文
  const value = {
    language,
    setLanguage,
    t,
    dir
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}