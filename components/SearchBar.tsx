'use client'

import React, { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  className = ''
}) => {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && onSearch) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* 移动端搜索按钮 */}
      <button
        onClick={() => setIsExpanded(true)}
        className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="搜索"
      >
        <Search size={20} />
      </button>

      {/* 搜索框 */}
      <form
        onSubmit={handleSubmit}
        className={`${
          isExpanded ? 'fixed inset-0 z-50 flex items-center p-4 bg-white dark:bg-gray-900' : 'hidden md:block'
        }`}
      >
        {isExpanded && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div className={`relative ${isExpanded ? 'w-full' : ''}`}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || t('search.placeholder')}
            className={`w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              isExpanded ? 'text-lg' : ''
            }`}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="清除搜索"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchBar