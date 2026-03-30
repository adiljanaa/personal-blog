// 文章类型定义
export interface Article {
  id: string
  slug: string
  title: string
  titleUyghur: string
  excerpt: string
  excerptUyghur: string
  content: string
  contentUyghur: string
  coverImage?: string
  author: string
  publishedAt: string
  updatedAt?: string
  readTime: number
  tags: string[]
  category: string
  isFeatured?: boolean
  isPublished: boolean
}

// 标签类型定义
export interface Tag {
  id: string
  name: string
  nameUyghur: string
  slug: string
  articleCount: number
  color: string
}

// 文章列表参数
export interface ArticleListParams {
  page?: number
  limit?: number
  tag?: string
  category?: string
  search?: string
  sortBy?: 'latest' | 'popular' | 'featured'
}

// 文章列表响应
export interface ArticleListResponse {
  articles: Article[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}