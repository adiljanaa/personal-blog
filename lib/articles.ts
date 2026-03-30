import { Article, Tag, ArticleListParams, ArticleListResponse } from '@/types/article'
import { format } from 'date-fns'

// 模拟文章数据
export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'getting-started-with-nextjs-14',
    title: 'Next.js 14 入门指南',
    titleUyghur: 'Next.js 14 بىلەن باشلاش قوللانمىسى',
    excerpt: '学习如何使用 Next.js 14 构建现代化的 React 应用，包括 App Router、Server Components 和最新功能。',
    excerptUyghur: 'Next.js 14 ئىشلىتىپ زامانىۋى React قوللىنىشچان پروگراممىلىرىنى قانداق قۇرۇشنى ئۆگىنىڭ، App Router، Server Components ۋە ئەڭ يېڭى ئىقتىدارلارنى ئۆز ئىچىگە ئالىدۇ.',
    content: '# Next.js 14 入门指南\n\n## 介绍\nNext.js 14 带来了许多令人兴奋的新功能...',
    contentUyghur: '# Next.js 14 بىلەن باشلاش قوللانمىسى\n\n## تونۇشتۇرۇش\nNext.js 14 نۇرغۇن قىزىقارلىق يېڭى ئىقتىدارلارنى ئېلىپ كەلدى...',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    author: '张三',
    publishedAt: '2024-01-15',
    readTime: 5,
    tags: ['Next.js', 'React', '前端开发'],
    category: '技术',
    isFeatured: true,
    isPublished: true
  },
  {
    id: '2',
    slug: 'tailwind-css-best-practices',
    title: 'Tailwind CSS 最佳实践',
    titleUyghur: 'Tailwind CSS ئەڭ ياخشى ئەمەلىيەتلىرى',
    excerpt: '分享在项目中使用 Tailwind CSS 的最佳实践和技巧，提高开发效率。',
    excerptUyghur: 'قانداقلىق Tailwind CSS ئىشلىتىپ پروگرامما تەرەققىيات ئۈنۈمىنى ئاشۇرۇشنىڭ ئەڭ ياخشى ئەمەلىيەتلىرى ۋە ماھارەتلىرىنى ئورتاقلاڭ.',
    content: '# Tailwind CSS 最佳实践\n\n## 为什么选择 Tailwind CSS\nTailwind CSS 是一个功能优先的 CSS 框架...',
    contentUyghur: '# Tailwind CSS ئەڭ ياخشى ئەمەلىيەتلىرى\n\n## نېمە ئۈچۈن Tailwind CSS نى تاللاڭ\nTailwind CSS بىر ئىقتىدار-ئاۋۋال CSS قۇرۇلۇشى بولۇپ...',
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    author: '李四',
    publishedAt: '2024-01-20',
    readTime: 8,
    tags: ['Tailwind CSS', 'CSS', '前端'],
    category: '技术',
    isFeatured: true,
    isPublished: true
  },
  {
    id: '3',
    slug: 'personal-blog-development',
    title: '个人博客开发心得',
    titleUyghur: 'شەخسىي بىلوگ تەرەققىياتى ھېسسىياتى',
    excerpt: '记录从零开始开发个人博客网站的经验和心得体会。',
    excerptUyghur: 'نۆلدىن باشلاپ شەخسىي بىلوگ تور بېكىتىنى تەرەققىي قىلدۇرۇشنىڭ تەجرىبىسى ۋە ھېسسىياتلىرىنى خاتىرىلەڭ.',
    content: '# 个人博客开发心得\n\n## 项目规划\n在开始开发之前，需要明确博客的目标和功能需求...',
    contentUyghur: '# شەخسىي بىلوگ تەرەققىياتى ھېسسىياتى\n\n## پروگرامما پىلانلاش\nتەرەققىي قىلدۇرۇشنى باشلاشتىن بۇرۇن، بىلوگنىڭ نىشانلىرى ۋە ئىقتىدار تەلەپلىرىنى ئېنىقلىشىڭىز كېرەك...',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    author: '王五',
    publishedAt: '2024-01-25',
    readTime: 6,
    tags: ['博客', '开发经验', '学习笔记'],
    category: '生活',
    isPublished: true
  },
  {
    id: '4',
    slug: 'typescript-advanced-features',
    title: 'TypeScript 高级特性',
    titleUyghur: 'TypeScript ئالىي ئىقتىدارلىرى',
    excerpt: '深入探讨 TypeScript 的高级特性和使用技巧，提升代码质量。',
    excerptUyghur: 'TypeScript نىڭ ئالىي ئىقتىدارلىرى ۋە ئىشلىتىش ماھارەتلىرىنى چوڭقۇر تەتقىق قىلىپ، كود سۈپىتىنى ئاشۇرۇڭ.',
    content: '# TypeScript 高级特性\n\n## 泛型编程\nTypeScript 的泛型提供了创建可重用组件的强大方式...',
    contentUyghur: '# TypeScript ئالىي ئىقتىدارلىرى\n\n## ئومۇميۈزلۈك پروگراممىلاش\nTypeScript نىڭ ئومۇميۈزلۈك ئىقتىدارى قايتا ئىشلىتىشچان مودۇللارنى قۇرۇشنىڭ كۈچلۈك ئۇسۇلىنى تەمىنلەيدۇ...',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    author: '赵六',
    publishedAt: '2024-02-01',
    readTime: 10,
    tags: ['TypeScript', 'JavaScript', '编程'],
    category: '技术',
    isPublished: true
  },
  {
    id: '5',
    slug: 'react-hooks-best-practices',
    title: 'React Hooks 最佳实践',
    titleUyghur: 'React Hooks ئەڭ ياخشى ئەمەلىيەتلىرى',
    excerpt: '掌握 React Hooks 的正确使用方式和最佳实践，避免常见陷阱。',
    excerptUyghur: 'React Hooks نى توغرا ئىشلىتىش ئۇسۇلى ۋە ئەڭ ياخشى ئەمەلىيەتلىرىنى ئىگىلەڭ، ئادەتتىكى تۇيۇقلارنىڭ ئالدىنى ئېلىڭ.',
    content: '# React Hooks 最佳实践\n\n## useState Hook\nuseState 是 React 中最常用的 Hook 之一...',
    contentUyghur: '# React Hooks ئەڭ ياخشى ئەمەلىيەتلىرى\n\n## useState Hook\nuseState بولسا React دىكى ئەڭ كۆپ ئىشلىتىلىدىغان Hook لارنىڭ بىرى...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: '张三',
    publishedAt: '2024-02-05',
    readTime: 7,
    tags: ['React', 'Hooks', '前端开发'],
    category: '技术',
    isPublished: true
  }
]

// 模拟标签数据
export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Next.js',
    nameUyghur: 'Next.js',
    slug: 'nextjs',
    articleCount: 5,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  {
    id: '2',
    name: 'React',
    nameUyghur: 'React',
    slug: 'react',
    articleCount: 8,
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  },
  {
    id: '3',
    name: 'TypeScript',
    nameUyghur: 'TypeScript',
    slug: 'typescript',
    articleCount: 6,
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  },
  {
    id: '4',
    name: 'Tailwind CSS',
    nameUyghur: 'Tailwind CSS',
    slug: 'tailwind-css',
    articleCount: 4,
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
  },
  {
    id: '5',
    name: '前端开发',
    nameUyghur: 'ئالدىنقى قاتار تەرەققىيات',
    slug: 'frontend-development',
    articleCount: 12,
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  {
    id: '6',
    name: '学习笔记',
    nameUyghur: 'ئۆگىنىش خاتىرىلىرى',
    slug: 'study-notes',
    articleCount: 7,
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
  },
  {
    id: '7',
    name: '生活',
    nameUyghur: 'ھايات',
    slug: 'life',
    articleCount: 9,
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
  }
]

// 获取文章列表
export async function getArticles(params: ArticleListParams = {}): Promise<ArticleListResponse> {
  const {
    page = 1,
    limit = 10,
    tag,
    category,
    search,
    sortBy = 'latest'
  } = params

  let filteredArticles = [...mockArticles]

  // 按标签过滤
  if (tag) {
    filteredArticles = filteredArticles.filter(article => 
      article.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  // 按分类过滤
  if (category) {
    filteredArticles = filteredArticles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    )
  }

  // 搜索过滤
  if (search) {
    const searchLower = search.toLowerCase()
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  // 排序
  switch (sortBy) {
    case 'latest':
      filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      break
    case 'featured':
      filteredArticles.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      break
  }

  // 分页逻辑
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    total: filteredArticles.length,
    page,
    totalPages: Math.ceil(filteredArticles.length / limit),
    hasNext: endIndex < filteredArticles.length,
    hasPrev: page > 1
  }
}

// 获取单个文章
export async function getArticle(slug: string): Promise<Article | null> {
  return mockArticles.find(article => article.slug === slug) || null
}

// 获取热门文章
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  return mockArticles
    .filter(article => article.isFeatured)
    .slice(0, limit)
}

// 获取所有标签
export async function getTags(): Promise<Tag[]> {
  return mockTags
}

// 获取单个标签
export async function getTag(slug: string): Promise<Tag | null> {
  return mockTags.find(tag => tag.slug === slug) || null
}

// 获取标签相关文章
export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  const tag = mockTags.find(t => t.slug === tagSlug)
  if (!tag) return []
  
  return mockArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.name.toLowerCase())
  )
}

// 格式化日期
export function formatDate(date: string): string {
  try {
    return format(new Date(date), 'yyyy年MM月dd日')
  } catch {
    return date
  }
}

// 格式化维吾尔语日期
export function formatDateUyghur(date: string): string {
  try {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${year}-يىل ${month}-ئاي ${day}-كۈن`
  } catch {
    return date
  }
}