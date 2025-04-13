'use client'

import { motion } from 'framer-motion'
import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiTwitter, FiLinkedin } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AnimatedSection from '@/components/AnimatedSection'

const blogPosts = [
  {
    slug: "building-my-portfolio",
    title: "Building My Developer Portfolio: A Journey in Next.js and Modern Web Development",
    date: "March 20, 2024",
    readTime: "8 min read",
    content: `# Building My Developer Portfolio: A Journey in Next.js and Modern Web Development

As I embark on my journey to find new opportunities in software development, I decided to build a modern portfolio website that showcases my skills, projects, and experience. This post details the process, technologies used, and the decisions made along the way.

## Why Next.js?

I chose Next.js for this project because:
- Server-side rendering for better SEO
- Built-in routing and API routes
- Excellent TypeScript support
- Great developer experience
- Strong community and documentation

## Key Features Implemented

### 1. Modern Design
- Clean, minimalist interface
- Dark/light mode support
- Responsive design for all devices
- Smooth animations and transitions

### 2. Project Showcase
- Detailed project pages
- Interactive project cards
- Technology tags and descriptions
- Links to live demos and GitHub repositories

### 3. Blog Section
- MDX support for content
- Syntax highlighting for code blocks
- Social sharing capabilities
- Responsive images

### 4. Contact Integration
- Formspree for form handling
- Social media links
- Professional contact information

## Technical Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Form Handling**: Formspree
- **Deployment**: Vercel

## Looking for New Opportunities

I'm currently seeking opportunities in:
- Web Development
- Data Analysis
- AI Integration
- Product Development

If you're interested in working together or have any opportunities, feel free to reach out through the contact form or connect with me on LinkedIn.

## Future Improvements

- Add more interactive elements
- Implement a newsletter subscription
- Add a projects filter system
- Include more detailed case studies
- Add a testimonials section

## Conclusion

Building this portfolio has been a great learning experience and a chance to showcase my skills. I'm excited to continue improving it and to connect with potential employers and collaborators.

If you'd like to discuss any of the technologies used or potential opportunities, please don't hesitate to get in touch!`,
    imageUrl: "/images/blog/portfolio.jpg",
    tags: ["Next.js", "Web Development", "Portfolio", "Job Search"],
    author: {
      name: "Rhett Jorgensen",
      role: "Software Developer",
      imageUrl: "/images/profile.jpg"
    }
  }
]

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default function BlogPost({ params }: PageProps) {
    const { slug } = use(params)
    
    const post = blogPosts.find(post => post.slug === slug)

    if (!post) {
        return (
            <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="text-blue-600 hover:underline">
                        Back to blog
                    </Link>
                </div>
            </div>
        )
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900"
        >
            <div className="max-w-4xl mx-auto px-4">
                <AnimatedSection>
                    <Link 
                        href="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Blog
                    </Link>
                    
                    <h1 className="text-4xl font-bold mb-4">Blog Post: {slug}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        This is a placeholder for the blog post content.
                    </p>
                </AnimatedSection>
            </div>
        </motion.div>
    )
} 