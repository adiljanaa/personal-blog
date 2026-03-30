import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 合并CSS类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 格式化维吾尔语日期
export function formatDateUyghur(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}-يىل ${month}-ئاي ${day}-كۈن`
}

// 计算阅读时间
export function calculateReadTime(content: string, wordsPerMinute = 200): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// 生成随机颜色
export function getRandomColor(): string {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 生成Slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 深拷贝
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// 获取本地存储
export function getLocalStorage(key: string, defaultValue: any = null) {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

// 设置本地存储
export function setLocalStorage(key: string, value: any) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to set localStorage:', error)
  }
}

// 移除本地存储
export function removeLocalStorage(key: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove localStorage:', error)
  }
}

// 检测设备类型
export function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// 滚动到顶部
export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior })
  }
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch {
    return false
  }
}