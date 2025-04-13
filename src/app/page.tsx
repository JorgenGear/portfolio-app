'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'
import ParticleBackground from '@/components/ParticleBackground'
import HeroBackground from '@/components/HeroBackground'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/data'
import { FaCode, FaBook, FaLightbulb } from 'react-icons/fa'

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
    </div>
  )
} 