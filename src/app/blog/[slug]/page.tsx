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

export default function BlogPost({ params }: { params: { slug: string } }) {
  const resolvedParams = use(params)
  const post = blogPosts.find(post => post.slug === resolvedParams.slug)

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
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:underline mb-8 group"
          >
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to blog
          </Link>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </header>

            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-4xl font-bold mb-8 mt-12">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-3xl font-bold mb-6 mt-10">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold mb-4 mt-8">{children}</h3>,
                  p: ({ children }) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>,
                  li: ({ children }) => <li className="mb-2">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-6 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          url: shareUrl
                        })
                      }
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Share this post"
                  >
                    <FiShare2 />
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiTwitter />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </footer>
          </article>
        </AnimatedSection>
      </div>
    </div>
  )
} 