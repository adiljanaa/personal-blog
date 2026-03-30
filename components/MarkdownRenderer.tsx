'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CheckCircle, AlertTriangle, Info, Lightbulb } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const components = {
    // 代码块
    code({ node, inline, className: codeClassName, children, ...props }: any) {
      const match = /language-(\w+)/.exec(codeClassName || '')
      const language = match ? match[1] : 'text'
      
      if (inline) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        )
      }

      return (
        <div className="relative group">
          <div className="absolute top-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
              }}
              className="px-2 py-1 text-xs bg-gray-800 text-gray-200 rounded hover:bg-gray-700 transition-colors"
            >
              复制
            </button>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={language}
            PreTag="div"
            className="rounded-lg !bg-gray-900 !mt-0 !mb-4"
            showLineNumbers
            lineNumberStyle={{ color: '#666', minWidth: '3em' }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      )
    },

    // 标题
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-900 dark:text-white">
        {children}
      </h4>
    ),

    // 段落
    p: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),

    // 列表
    ul: ({ children }: any) => (
      <ul className="mb-4 pl-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="mb-4 pl-5 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="mb-1">
        {children}
      </li>
    ),

    // 引用
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 rounded-r">
        {children}
      </blockquote>
    ),

    // 链接
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:underline"
      >
        {children}
      </a>
    ),

    // 表格
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => (
      <tr>
        {children}
      </tr>
    ),
    th: ({ children }: any) => (
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),

    // 强调
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">
        {children}
      </em>
    ),

    // 水平线
    hr: () => (
      <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
    ),

    // 图片
    img: ({ src, alt }: any) => (
      <div className="my-6">
        <img
          src={src}
          alt={alt}
          className="rounded-lg max-w-full h-auto mx-auto shadow-lg"
          loading="lazy"
        />
        {alt && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            {alt}
          </p>
        )}
      </div>
    ),

    // 自定义容器
    div: ({ node, children, ...props }: any) => {
      const className = props.className || ''
      
      if (className.includes('note-')) {
        const type = className.replace('note-', '')
        const icons = {
          tip: <Lightbulb size={20} className="text-blue-500" />,
          warning: <AlertTriangle size={20} className="text-amber-500" />,
          important: <Info size={20} className="text-purple-500" />,
          success: <CheckCircle size={20} className="text-green-500" />
        }
        
        const colors = {
          tip: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
          important: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
          success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        }
        
        const titles = {
          tip: '提示',
          warning: '警告',
          important: '重要',
          success: '成功'
        }
        
        return (
          <div className={`my-4 p-4 rounded-xl border ${colors[type as keyof typeof colors]}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {icons[type as keyof typeof icons]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {titles[type as keyof typeof titles]}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      return <div {...props}>{children}</div>
    }
  }

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer