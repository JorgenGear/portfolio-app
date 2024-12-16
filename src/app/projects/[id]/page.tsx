'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import CodeBlock from '@/components/CodeBlock'
import DataVisualization from '@/components/DataVisualization'
import { use } from 'react'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default function ProjectPage({ params }: PageProps) {
    const resolvedParams = use(params)
    const project = projects.find(p => p.id === parseInt(resolvedParams.id))
    
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl">Project not found</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <Link 
                    href="/projects"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                >
                    <span className="mr-2">←</span> Back to Projects
                </Link>

                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8"
                >
                    <div className="relative h-64 md:h-96">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                            <div className="flex gap-4">
                                {project.githubUrl && (
                                    <Link 
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    >
                                        <FiGithub className="w-5 h-5" />
                                    </Link>
                                )}
                                {project.liveUrl && (
                                    <Link 
                                        href={project.liveUrl}
                                        target="_blank"
                                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    >
                                        <FiExternalLink className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                            {project.description}
                        </p>
                    </div>
                </motion.div>

                {/* Project Content */}
                <div className="grid gap-8">
                    {/* Overview Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {project.longDescription || project.description}
                        </p>
                    </motion.section>

                    {/* Technical Details */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
                        <div className="space-y-4">
                            {project.technicalDetails?.map((detail, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-lg mb-2">{detail.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{detail.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Project Type Specific Content */}
                    {project.category === 'data-viz' && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">Data Visualization</h2>
                            <DataVisualization projectId={project.id} />
                        </motion.section>
                    )}

                    {/* Code Snippets */}
                    {project.codeSnippets && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">Code Highlights</h2>
                            {project.codeSnippets.map((snippet, index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">{snippet.title}</h3>
                                    <CodeBlock
                                        code={snippet.code}
                                        language={snippet.language}
                                    />
                                </div>
                            ))}
                        </motion.section>
                    )}

                    {/* Challenges and Solutions */}
                    {project.challenges && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
                            <div className="space-y-6">
                                {project.challenges.map((challenge, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-lg mb-2">Challenge: {challenge.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</p>
                                        <div className="pl-4 border-l-2 border-blue-500">
                                            <h4 className="font-medium mb-2">Solution:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{challenge.solution}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>
        </div>
    )
} 