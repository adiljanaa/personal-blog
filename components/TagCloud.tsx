'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { Tag } from '@/types/article'
import { Hash } from 'lucide-react'

interface TagCloudProps {
  tags: Tag[]
  maxCount?: number
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, maxCount = 12 }) => {
  const { language } = useLanguage()

  // 按文章数量排序
  const sortedTags = [...tags]
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, maxCount)

  // 确定标签大小
  const getSizeClass = (articleCount: number) => {
    if (articleCount >= 10) return 'text-lg'
    if (articleCount >= 5) return 'text-base'
    return 'text-sm'
  }

  // 确定标签权重
  const getWeightClass = (articleCount: number) => {
    if (articleCount >= 10) return 'font-bold'
    if (articleCount >= 5) return 'font-semibold'
    return 'font-medium'
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-3 justify-center">
        {sortedTags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags/${tag.slug}`}
            className={`group inline-flex items-center px-4 py-2 rounded-full ${tag.color} transition-all duration-200 hover:scale-105 hover:shadow-md`}
          >
            <Hash size={14} className="mr-2" />
            <span className={`${getSizeClass(tag.articleCount)} ${getWeightClass(tag.articleCount)}`}>
              {language === 'zh' ? tag.name : tag.nameUyghur}
            </span>
            <span className="ml-2 text-xs opacity-75">
              {tag.articleCount}
            </span>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link
          href="/tags"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          查看所有标签
          <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  )
}

export default TagCloud