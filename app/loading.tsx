export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          {/* 加载动画 */}
          <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          
          {/* 外部光环 */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary-400 rounded-full animate-spin" 
               style={{ animationDuration: '2s' }}></div>
          
          {/* 内部光环 */}
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary-300 rounded-full animate-spin m-auto" 
               style={{ animationDuration: '1.5s' }}></div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            加载中...
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            正在为您准备内容，请稍候
          </p>
        </div>
        
        {/* 进度指示器 */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full animate-pulse" 
                 style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>正在加载</span>
            <span>60%</span>
          </div>
        </div>
        
        {/* 提示信息 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-medium text-gray-900 dark:text-white">获取文章</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">🎨</div>
            <div className="font-medium text-gray-900 dark:text-white">渲染界面</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-medium text-gray-900 dark:text-white">优化性能</div>
          </div>
        </div>
      </div>
    </div>
  )
}