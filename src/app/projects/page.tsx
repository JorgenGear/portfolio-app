'use client'

import { useState } from 'react'
import { projects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'

const CATEGORIES = {
    'all': 'All Projects',
    'data-viz': 'Data Visualization',
    'web-dev': 'Web Development',
    'machine-learning': 'Machine Learning',
    'finance': 'Financial Analysis'
} as const

type CategoryType = keyof typeof CATEGORIES

export default function Projects() {
    const [filter, setFilter] = useState<CategoryType>('all')

    const filteredProjects = projects.filter(project =>
        filter === 'all' ? true : project.category === filter
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
                {Object.entries(CATEGORIES).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key as CategoryType)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filter === key
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                        }`}
                    >
                        {label}
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
