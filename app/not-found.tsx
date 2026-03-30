import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          抱歉，您访问的页面不存在或已被移除
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              检查URL
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              确保您输入的网址正确无误
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              使用搜索
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              搜索您想找的内容
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              联系作者
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              报告问题或寻求帮助
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            返回首页
          </Link>
          
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
          >
            <Search size={20} className="mr-2" />
            浏览文章
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回上一页
          </button>
        </div>
        
        <div className="mt-12 text-gray-500 dark:text-gray-400">
          <p className="mb-2">常见原因：</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
            <li>文章可能已被移动或删除</li>
            <li>网址输入错误</li>
            <li>链接已过期</li>
            <li>页面正在维护中</li>
          </ul>
        </div>
      </div>
    </div>
  )
}