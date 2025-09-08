"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../../public/Logo2.png';

interface BlogHeaderProps {
  variant?: 'blog' | 'article';
}

export default function BlogHeader({ variant = 'blog' }: BlogHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 100;
    
    // Update scroll progress for dynamic styling
    const progress = Math.min(currentScrollY / 200, 1);
    setScrollProgress(progress);
    
    // Simple and reliable logic
    if (currentScrollY <= scrollThreshold) {
      // At the top - always show
      setIsVisible(true);
    } else {
      if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
        // Scrolling down past threshold - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show
        setIsVisible(true);
      }
    }
    
    // Store current position for next comparison
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    // Initialize scroll position
    lastScrollY.current = window.scrollY;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut",
            opacity: { duration: 0.2 }
          }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: `0 1px ${8 + scrollProgress * 16}px rgba(0, 0, 0, ${0.05 + scrollProgress * 0.1})`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Navigation */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-sm font-medium hover:underline transition-colors"
                  style={{ color: '#000000' }}
                >
                  Home
                </Link>
                {variant === 'article' && (
                  <Link
                    href="/blog"
                    className="text-sm font-medium hover:underline transition-colors"
                    style={{ color: '#000000' }}
                  >
                    All Posts
                  </Link>
                )}
              </div>

              {/* Center: Logo */}
              <div className="flex justify-center">
                <Link href="/" className="block group">
                  <Image
                    src={logo}
                    alt="Curated Cleanings"
                    width={200}
                    height={40}
                    className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                    priority
                  />
                </Link>
              </div>

              {/* Right: Contact */}
              <div className="flex items-center space-x-6">
                <a
                  href="tel:+14074701780"
                  className="text-sm font-medium hover:underline transition-colors hidden sm:block"
                  style={{ color: '#000000' }}
                >
                  (407) 470-1780
                </a>
                <a
                  href="tel:+14074701780"
                  className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}