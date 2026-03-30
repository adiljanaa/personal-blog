'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  )
}

export default ThemeToggle