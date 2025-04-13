'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import ParticleBackground from '@/components/ParticleBackground'
import HeroBackground from '@/components/HeroBackground'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/data'
import { FaCode, FaBook, FaLightbulb } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

const recentBlogPosts = [
    {
        slug: "data-science-best-practices",
        title: "Data Science Best Practices: From Data Collection to Deployment",
        date: "March 15, 2024",
        readTime: "10 min read",
        excerpt: "A comprehensive guide to data science best practices, covering the entire pipeline from data collection to model deployment.",
        tags: ["Data Science", "Machine Learning", "Best Practices"]
    },
    {
        slug: "modern-web-development",
        title: "Modern Web Development: Best Practices and Essential Tools",
        date: "March 16, 2024",
        readTime: "12 min read",
        excerpt: "A comprehensive guide to modern web development practices, covering essential tools, frameworks, and best practices.",
        tags: ["Web Development", "Frontend", "Backend"]
    },
    {
        slug: "building-my-portfolio",
        title: "Building My Developer Portfolio: A Journey in Next.js",
        date: "March 20, 2024",
        readTime: "8 min read",
        excerpt: "Join me on my journey of building a modern portfolio website using Next.js.",
        tags: ["Next.js", "Web Development", "Portfolio"]
    }
]

export default function Home() {
  // Only show Adobe Analytics (id: 9) and Zilk (id: 8) projects
  const featuredProjects = projects.filter(project => project.id === 8 || project.id === 9)

  const currentWork = [
    {
      title: "Learning Next.js 15",
      description: "Exploring the latest features and improvements in Next.js 15, including server actions and improved performance.",
      icon: <FaCode className="w-6 h-6" />,
      progress: 80
    },
    {
      title: "Building a Personal Blog",
      description: "Creating a technical blog to share insights, tutorials, and project updates.",
      icon: <FaBook className="w-6 h-6" />,
      progress: 40
    },
    {
      title: "AI Integration Projects",
      description: "Working on integrating AI capabilities into existing applications using OpenAI's API.",
      icon: <FaLightbulb className="w-6 h-6" />,
      progress: 60
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700">
          <HeroBackground />
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Data Analytics & 
              <span className="block">Web Development</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Turning data into insights and ideas into applications
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                View My Work
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 bg-opacity-20 text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-30 transition"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">Some of my recent work</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Currently Working On */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Currently Working On</h2>
            <p className="text-gray-600 dark:text-gray-400">My current focus areas and learning journey</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentWork.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                    {work.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{work.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {work.description}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${work.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {work.progress}% complete
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">Latest insights and tutorials</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentBlogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
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

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All Posts
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 