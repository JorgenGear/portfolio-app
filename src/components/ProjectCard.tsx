'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import TiltCard from './TiltCard'

interface ProjectCardProps {
    title: string
    description: string
    imageUrl: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
}

export default function ProjectCard({
    title,
    description,
    imageUrl,
    tags,
    liveUrl,
    githubUrl
}: ProjectCardProps) {
    return (
        <TiltCard>
            <motion.div
                whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative h-48 md:h-64">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-3">
                            {githubUrl && (
                                <Link 
                                    href={githubUrl}
                                    className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition"
                                >
                                    <FiGithub className="w-5 h-5 text-white" />
                                </Link>
                            )}
                            {liveUrl && (
                                <Link 
                                    href={liveUrl}
                                    className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition"
                                >
                                    <FiExternalLink className="w-5 h-5 text-white" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 dark:text-white">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </TiltCard>
    )
}