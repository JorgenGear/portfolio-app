'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import BlogPost from '@/components/BlogPost'

// This would typically come from your CMS or MDX files
const blogPosts = [
  {
    title: "Building My Developer Portfolio: A Journey in Next.js and Modern Web Development",
    date: "March 20, 2024",
    readTime: "8 min read",
    excerpt: "Join me on my journey of building a modern portfolio website using Next.js, and learn about the technologies and decisions that shaped this project.",
    slug: "building-my-portfolio",
    imageUrl: "/images/blog/portfolio.jpg",
    tags: ["Next.js", "Web Development", "Portfolio", "Job Search"]
  }
]

export default function Blog() {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Insights, tutorials, and updates from my journey in tech
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
} 