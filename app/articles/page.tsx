import ArticleList from '@/components/ArticleList'
import { getArticles } from '@/lib/articles'
import { Search, Filter, Calendar } from 'lucide-react'

interface ArticlesPageProps {
  searchParams: {
    page?: string
    tag?: string
    category?: string
    search?: string
  }
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const page = parseInt(searchParams.page || '1')
  const { articles, total, totalPages } = await getArticles({
    page,
    limit: 12,
    tag: searchParams.tag,
    category: searchParams.category,
    search: searchParams.search
  })

  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          所有文章
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          探索技术文章、学习笔记和生活思考
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 搜索框 */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索文章..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 分类筛选 */}
          <div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none">
                <option value="">所有分类</option>
                <option value="技术">技术</option>
                <option value="生活">生活</option>
                <option value="思考">思考</option>
              </select>
            </div>
          </div>

          {/* 排序 */}
          <div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none">
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
                <option value="featured">精选文章</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            文章总数
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.ceil(total / 12)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            总页数
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {articles.filter(a => a.isFeatured).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            精选文章
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            5.2
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            平均阅读时间(分钟)
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div>
        <ArticleList articles={articles} showAllLink={false} />
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={page === 1}
            >
              上一页
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (page > 3) {
                    pageNum = page - 2 + i
                  }
                  if (pageNum > totalPages) {
                    return null
                  }
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      page === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <span className="text-gray-500">...</span>
                  <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={page === totalPages}
            >
              下一页
            </button>
          </nav>
        </div>
      )}

      {/* 订阅提醒 */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center border border-primary-100 dark:border-primary-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          不错过任何更新
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          订阅我们的博客，获取最新的技术文章和更新通知
        </p>
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="输入您的邮箱"
            className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            订阅
          </button>
        </div>
      </div>
    </div>
  )
}