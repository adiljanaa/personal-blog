'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all duration-300 transform',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
      aria-label="回到顶部"
    >
      <ArrowUp size={24} />
    </button>
  )
}

export default ScrollToTop