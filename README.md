# 个人博客网站

一个现代化的个人博客网站，支持多语言切换（中文/维吾尔语），包含文章列表、详情、标签分类、关于页面等功能。

## ✨ 功能特点

### 🌐 多语言支持
- 支持中文和维吾尔语切换
- 自动切换文字方向（LTR/RTL）
- 字体适配：中文使用 Noto Sans SC，维吾尔语使用 Noto Sans Arabic
- 本地化存储语言偏好设置

### 📱 响应式设计
- 完美适配移动端、平板和桌面
- 移动端优化导航和交互
- 支持 PWA（渐进式Web应用）
- 暗色/亮色主题切换

### 🎨 现代化UI
- 使用 Tailwind CSS 构建
- 渐变背景和卡片设计
- 平滑过渡动画
- 主流色彩搭配

### 📝 博客功能
- 文章列表展示（卡片式布局）
- 文章详情页（支持 Markdown 渲染）
- 标签分类系统
- 关于作者页面
- 搜索和筛选功能

### 🔧 技术栈
- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式系统**: Tailwind CSS
- **状态管理**: React Context
- **代码高亮**: React Syntax Highlighter
- **图标库**: Lucide React
- **日期处理**: date-fns

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd personal-blog
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开
```
http://localhost:3000
```

### 构建生产版本
```bash
npm run build
npm start
```

## 📁 项目结构

```
personal-blog/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── articles/          # 文章相关页面
│   ├── tags/              # 标签页面
│   ├── about/             # 关于页面
│   ├── layout.tsx         # 根布局
│   ├── globals.css        # 全局样式
│   └── not-found.tsx      # 404页面
├── components/            # React组件
│   ├── Navigation.tsx     # 导航栏
│   ├── ArticleList.tsx    # 文章列表
│   ├── MarkdownRenderer.tsx # Markdown渲染器
│   ├── LanguageSelector.tsx # 语言选择器
│   └── ...
├── lib/                   # 工具函数和配置
│   ├── articles.ts        # 文章数据管理
│   ├── i18n.ts            # 多语言配置
│   └── utils.ts           # 通用工具函数
├── types/                 # TypeScript类型定义
├── public/                # 静态资源
└── package.json          # 项目配置
```

## 🌍 多语言配置

### 添加新语言
1. 在 `lib/i18n.ts` 中定义语言代码：
```typescript
export type Language = 'zh' | 'ug' | 'en' // 添加新语言
```

2. 在 `translations` 对象中添加对应翻译：
```typescript
export const translations: Translations = {
  'key.name': {
    zh: '中文翻译',
    ug: '维吾尔语翻译',
    en: '英文翻译'  // 新语言
  }
}
```

3. 在 `languageDirections` 中设置文字方向：
```typescript
export const languageDirections: Record<Language, 'ltr' | 'rtl'> = {
  zh: 'ltr',
  ug: 'rtl',
  en: 'ltr'  // 新语言
}
```

### 使用翻译
在组件中使用 `useLanguage` hook：
```tsx
const { t, language, setLanguage } = useLanguage()
return <div>{t('key.name')}</div>
```

## 📱 移动端适配

### 响应式断点
- `sm`: 640px (手机)
- `md`: 768px (平板)
- `lg`: 1024px (桌面)
- `xl`: 1280px (大桌面)

### 移动端优化
- 汉堡菜单（小屏幕时显示）
- 触摸友好的按钮和交互
- 移动端优先的设计
- PWA 支持（可安装到主屏幕）

## 🎨 主题系统

### 主题切换
项目支持亮色和暗色主题，用户可以通过主题切换按钮手动切换，或跟随系统设置。

### 自定义主题
在 `tailwind.config.js` 中修改主题颜色：
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... 其他色阶
        900: '#1e3a8a'
      }
    }
  }
}
```

## 📝 文章管理

### 添加新文章
1. 在 `lib/articles.ts` 的 `mockArticles` 数组中添加新文章：
```typescript
{
  id: 'unique-id',
  slug: 'article-slug',
  title: '文章标题',
  titleUyghur: '维吾尔语标题',
  excerpt: '文章摘要',
  excerptUyghur: '维吾尔语摘要',
  content: 'Markdown内容',
  contentUyghur: '维吾尔语内容',
  // ... 其他字段
}
```

2. 文章将自动出现在首页和文章列表

### 标签管理
- 在 `mockTags` 数组中添加或修改标签
- 标签会自动关联到相关文章

## 🔧 开发指南

### 添加新组件
1. 在 `components/` 目录下创建新的组件文件
2. 使用 TypeScript 定义 Props 类型
3. 使用 Tailwind CSS 进行样式设计
4. 确保组件支持响应式设计

### 样式规范
- 使用 Tailwind CSS 工具类
- 遵循移动端优先原则
- 保持一致的间距和字体大小
- 使用语义化的颜色名称

### 性能优化
- 使用 Next.js 的图片优化
- 实现代码分割和懒加载
- 优化字体加载
- 减少不必要的重渲染

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持

如有问题或建议，请通过以下方式联系：
- 创建 GitHub Issue
- 发送邮件到 contact@example.com

---

**快乐编码！** 🚀