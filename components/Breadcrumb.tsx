'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      <Link
        href="/"
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="text-gray-400 mx-2" />
          
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb