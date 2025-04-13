'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const blogPosts = [
    {
        slug: 'nextjs-15-updates',
        title: 'Next.js 15: What\'s New and How to Upgrade',
        date: 'April 13, 2024',
        readTime: '5 min read',
        excerpt: 'A comprehensive guide to the latest features and breaking changes in Next.js 15.',
        tags: ['Next.js', 'React', 'Web Development']
    },
    {
        slug: 'building-portfolio',
        title: 'Building a Modern Portfolio with Next.js',
        date: 'April 12, 2024',
        readTime: '8 min read',
        excerpt: 'Learn how to create a stunning portfolio website using Next.js, Tailwind CSS, and Framer Motion.',
        tags: ['Next.js', 'Tailwind CSS', 'Portfolio']
    }
]

export default function Blog() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            
            <div className="space-y-8">
                {blogPosts.map((post) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                                {post.title}
                            </h2>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                            Read more
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    )
} 