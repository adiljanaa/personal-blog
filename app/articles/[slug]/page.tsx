import { notFound } from 'next/navigation'
import { getArticle, getFeaturedArticles } from '@/lib/articles'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import ArticleList from '@/components/ArticleList'
import { 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  Share2, 
  Bookmark,
  Eye,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: '文章不存在',
      description: '您要查找的文章不存在'
    }
  }

  return {
    title: `${article.title} | 个人博客`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)
  const featuredArticles = await getFeaturedArticles(3)

  if (!article) {
    notFound()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          返回文章列表
        </Link>
      </div>

      {/* 文章标题区域 */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {article.category}
          </span>
          {article.isFeatured && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              精选文章
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {article.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {article.excerpt}
        </p>

        {/* 文章元信息 */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 border-t border-b border-gray-200 dark:border-gray-700 py-4">
          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            <span>{article.readTime} 分钟阅读</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-2" />
            <span>999+ 阅读</span>
          </div>
        </div>
      </div>

      {/* 文章封面 */}
      {article.coverImage && (
        <div className="mb-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* 文章内容 */}
      <div className="mb-12">
        <MarkdownRenderer content={article.content} />
      </div>

      {/* 标签 */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <Tag size={20} className="mr-2 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">标签</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
          <Share2 size={18} className="mr-2" />
          分享文章
        </button>
        <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
          <Bookmark size={18} className="mr-2" />
          收藏文章
        </button>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          感谢作者
        </button>
      </div>

      {/* 作者信息 */}
      <div className="mb-12 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">
              {article.author.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {article.author}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              一名热爱技术的开发者，喜欢分享知识和经验，致力于创造有价值的内容。
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                查看所有文章
              </a>
              <a
                href="#"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                关注作者
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 推荐文章 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          推荐文章
        </h2>
        <ArticleList articles={featuredArticles} showAllLink={false} />
      </div>

      {/* 评论区域 */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          评论 (0)
        </h3>
        
        {/* 评论输入框 */}
        <div className="mb-6">
          <textarea
            placeholder="分享您的想法..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center mt-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              支持 Markdown 格式
            </div>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              发布评论
            </button>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          暂无评论，快来抢沙发吧！
        </div>
      </div>
    </div>
  )
}