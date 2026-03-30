import TagCloud from '@/components/TagCloud'
import ArticleList from '@/components/ArticleList'
import { getTags, getArticles } from '@/lib/articles'
import { Search } from 'lucide-react'

export default async function TagsPage() {
  const tags = await getTags()
  const { articles } = await getArticles({ limit: 6 })

  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          标签分类
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          按主题浏览文章，发现您感兴趣的内容
        </p>
      </div>

      {/* 搜索框 */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜索标签..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 标签云 */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            所有标签
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            点击标签查看相关文章
          </p>
        </div>
        <TagCloud tags={tags} maxCount={20} />
      </section>

      {/* 标签统计 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {tags.length}
          </div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            标签总数
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-700">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {tags.reduce((sum, tag) => sum + tag.articleCount, 0)}
          </div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            文章总数
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-700">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {Math.max(...tags.map(tag => tag.articleCount))}
          </div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            最热门标签文章数
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-700">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
            {Math.round(tags.reduce((sum, tag) => sum + tag.articleCount, 0) / tags.length)}
          </div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            平均每个标签文章数
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            最新文章
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            探索最新的技术文章
          </p>
        </div>
        <ArticleList articles={articles} showAllLink={false} />
      </section>

      {/* 使用说明 */}
      <section className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          如何使用标签系统？
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-2">
              <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">浏览标签</h4>
            <p className="text-gray-600 dark:text-gray-300">
              查看所有可用的标签，了解博客涵盖的主题范围
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-2">
              <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">点击标签</h4>
            <p className="text-gray-600 dark:text-gray-300">
              点击感兴趣的标签，查看该主题下的所有相关文章
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-2">
              <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">深入阅读</h4>
            <p className="text-gray-600 dark:text-gray-300">
              选择感兴趣的文章进行深入阅读和学习
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}