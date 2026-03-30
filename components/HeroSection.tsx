'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const { t, language } = useLanguage()

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-100 dark:border-primary-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 dark:bg-primary-800 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200 dark:bg-blue-800 rounded-full translate-y-24 -translate-x-24 opacity-20"></div>
      
      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 dark:border-primary-700 mb-6">
            <Sparkles size={16} className="text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              ✨ 全新改版上线
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="block">
              {language === 'zh' ? '个人技术博客' : 'شەخسىي تېخنىكا بىلوگى'}
            </span>
            <span className="text-primary-600 dark:text-primary-400">
              {language === 'zh' ? '分享知识与见解' : 'بىلىم ۋە كۆز قاراشلارنى ئورتاقلاش'}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {language === 'zh' 
              ? '记录技术学习历程，分享开发经验，探讨前沿技术，与您共同成长。'
              : 'تېخنىكا ئۆگىنىش جەريانىنى خاتىرىلەڭ، تەرەققىيات تەجرىبىسىنى ئورتاقلاڭ، ئىلگىرىكى تېخنىكىلارنى مۇنازىرە قىلىڭ، سىز بىلەن بىرلىكتە ئۆسۈڭ.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <BookOpen size={20} className="mr-2" />
              {t('actions.readMore')}
              <ArrowRight size={20} className="ml-2" />
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow"
            >
              {t('nav.about')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection