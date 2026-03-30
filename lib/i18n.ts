// 多语言配置和翻译文件
export type Language = 'zh' | 'ug'

export interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

// 翻译字典
export const translations: Translations = {
  // 站点信息
  'site.title': {
    zh: '个人博客',
    ug: 'شەخسىي بىلوگ'
  },
  'site.description': {
    zh: '分享知识与技术，记录生活与思考',
    ug: 'بىلىم ۋە تېخنىكىنى ئورتاقلىشىش، ھايات ۋە ئويلىنىشنى خاتىرىلەش'
  },
  
  // 导航菜单
  'nav.home': {
    zh: '首页',
    ug: 'باش بەت'
  },
  'nav.articles': {
    zh: '文章',
    ug: 'ماقالىلەر'
  },
  'nav.tags': {
    zh: '标签',
    ug: 'بەلگىلەر'
  },
  'nav.about': {
    zh: '关于',
    ug: 'ھەققىدە'
  },
  
  // 操作按钮
  'actions.readMore': {
    zh: '阅读更多',
    ug: 'تېخىمۇ كۆپ ئوقۇڭ'
  },
  'actions.viewAll': {
    zh: '查看全部',
    ug: 'ھەممىسىنى كۆرۈش'
  },
  'actions.search': {
    zh: '搜索',
    ug: 'ئىزدەش'
  },
  'actions.subscribe': {
    zh: '订阅',
    ug: 'مۇشتەرى بولۇش'
  },
  'actions.switchLight': {
    zh: '切换亮色模式',
    ug: 'يورۇق ئۇسلۇبىغا ئالماشتۇرۇش'
  },
  'actions.switchDark': {
    zh: '切换暗色模式',
    ug: 'قاراڭغۇ ئۇسلۇبىغا ئالماشتۇرۇش'
  },
  'actions.openMenu': {
    zh: '打开菜单',
    ug: 'تىزىملىكنى ئېچىش'
  },
  'actions.closeMenu': {
    zh: '关闭菜单',
    ug: 'تىزىملىكنى تاقاش'
  },
  
  // 首页
  'home.welcome': {
    zh: '欢迎来到我的博客',
    ug: 'مېنىڭ بىلوگىمغا خۇش كەپسىز'
  },
  'home.latestArticles': {
    zh: '最新文章',
    ug: 'ئەڭ يېڭى ماقالىلەر'
  },
  'home.popularTags': {
    zh: '热门标签',
    ug: 'ئالقىشقا ئېرىشكەن بەلگىلەر'
  },
  
  // 文章页面
  'articles.title': {
    zh: '所有文章',
    ug: 'ھەممە ماقالىلەر'
  },
  'articles.noArticles': {
    zh: '暂无文章',
    ug: 'ھازىرچە ماقالىلەر يوق'
  },
  'articles.published': {
    zh: '发布于',
    ug: 'تارقاتقان ۋاقتى'
  },
  'articles.readTime': {
    zh: '阅读时间',
    ug: 'ئوقۇش ۋاقتى'
  },
  'articles.minutes': {
    zh: '分钟',
    ug: 'مىنۇت'
  },
  
  // 标签页面
  'tags.title': {
    zh: '标签分类',
    ug: 'بەلگە تۈرلىرى'
  },
  'tags.allTags': {
    zh: '所有标签',
    ug: 'ھەممە بەلگىلەر'
  },
  'tags.articlesCount': {
    zh: '篇文章',
    ug: 'ماقالە'
  },
  
  // 关于页面
  'about.title': {
    zh: '关于我',
    ug: 'مەن ھەققىدە'
  },
  'about.bio': {
    zh: '我是一名热爱技术的开发者，喜欢分享知识和经验。',
    ug: 'مەن تېخنىكىنى ياخشى كۆرىدىغان تەرەققىياتچى، بىلىم ۋە تەجرىبىلەرنى ئورتاقلىشىشنى ياخشى كۆرىمەن.'
  },
  'about.skills': {
    zh: '技能',
    ug: 'ماھارەت'
  },
  'about.contact': {
    zh: '联系我',
    ug: 'مەن بىلەن ئالاقىلىشىڭ'
  },
  
  // 页脚
  'footer.copyright': {
    zh: '© 2024 个人博客。保留所有权利。',
    ug: '© 2024 شەخسىي بىلوگ. ھەممە ھوقۇق ساقلىنىدۇ.'
  },
  'footer.madeWith': {
    zh: '使用 Next.js 和 Tailwind CSS 构建',
    ug: 'Next.js ۋە Tailwind CSS ئىشلىتىپ قۇرۇلدى'
  },
  
  // 搜索
  'search.placeholder': {
    zh: '搜索文章...',
    ug: 'ماقالە ئىزدەش...'
  },
  'search.noResults': {
    zh: '没有找到相关文章',
    ug: 'مۇناسىۋەتلىك ماقالىلەر تېپىلمىدى'
  },
  
  // 主题标签
  'themes.technology': {
    zh: '技术',
    ug: 'تېخنىكا'
  },
  'themes.life': {
    zh: '生活',
    ug: 'ھايات'
  },
  'themes.thoughts': {
    zh: '思考',
    ug: 'ئويلىنىش'
  },
  'themes.tutorial': {
    zh: '教程',
    ug: 'ئوقۇتۇش'
  }
}

// 获取翻译
export function getTranslation(key: string, language: Language): string {
  return translations[key]?.[language] || key
}

// 语言方向配置
export const languageDirections: Record<Language, 'ltr' | 'rtl'> = {
  zh: 'ltr',
  ug: 'rtl'
}

// 获取语言方向
export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  return languageDirections[language] || 'ltr'
}