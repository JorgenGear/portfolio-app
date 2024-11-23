'use client'

import { useState } from 'react'
import { projects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'

export default function Projects() {
    const [filter, setFilter] = useState<'all' | 'data-viz' | 'web-dev'>('all')

    const filteredProjects = projects.filter(project =>
        filter === 'all' ? true : project.category === filter
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-8">
                {['all', 'data-viz', 'web-dev'].map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category as any)}
                        className={`px-4 py-2 rounded-lg ${
                            filter === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                        }`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                layout
            >
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </motion.div>
        </div>
    )
}
