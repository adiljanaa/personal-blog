import HeroSection from '@/components/HeroSection'
import ArticleList from '@/components/ArticleList'
import TagCloud from '@/components/TagCloud'
import { getFeaturedArticles } from '@/lib/articles'
import { getTags } from '@/lib/articles'

export default async function HomePage() {
  const featuredArticles = await getFeaturedArticles(3)
  const tags = await getTags()

  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <HeroSection />
      
      {/* 最新文章 */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            最新文章
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            探索最新的技术文章和思考
          </p>
        </div>
        <ArticleList articles={featuredArticles} />
      </section>

      {/* 热门标签 */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            热门标签
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            按主题浏览文章
          </p>
        </div>
        <TagCloud tags={tags} />
      </section>

      {/* 特色功能 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            丰富内容
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            涵盖技术、生活、思考等多个领域，持续更新优质内容
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">🌐</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            多语言支持
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            支持中文和维吾尔语，自动切换文字方向和布局
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            响应式设计
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            完美适配手机、平板和电脑，提供一致的用户体验
          </p>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              发布文章
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              15+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              分类标签
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              10K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              阅读总量
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              365
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              持续更新
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}