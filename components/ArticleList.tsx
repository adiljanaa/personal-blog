'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { Article } from '@/types/article'
import { formatDate, formatDateUyghur } from '@/lib/articles'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'

interface ArticleListProps {
  articles: Article[]
  showAllLink?: boolean
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, showAllLink = true }) => {
  const { language } = useLanguage()

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          暂无文章
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          稍后回来查看最新文章
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* 封面图片 */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={language === 'zh' ? article.title : article.titleUyghur}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text1">📄</span>
                </div>
              )}
              {article.isFeatured && (
                <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  精选
                </div>
              )}
            </div>

            {/* 文章内容 */}
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  article.category === '技术' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {article.category}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  {article.readTime} 分钟
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                <Link href={`/articles/${article.slug}`}>
                  {language === 'zh' ? article.title : article.titleUyghur}
                </Link>
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {language === 'zh' ? article.excerpt : article.excerptUyghur}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs"
                  >
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{article.tags.length - 3}
                  </span>
                )}
              </div>

              {/* 作者和时间 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {article.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {article.author}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar size={12} className="mr-1" />
                      {language === 'zh' 
                        ? formatDate(article.publishedAt)
                        : formatDateUyghur(article.publishedAt)}
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center"
                >
                  阅读
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showAllLink && articles.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            查看所有文章
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default ArticleList