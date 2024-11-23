'use client'

import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

// Lazy load icons
const icons = {
    python: lazy(() => import('react-icons/di').then(mod => ({ default: mod.DiPython }))),
    react: lazy(() => import('react-icons/di').then(mod => ({ default: mod.DiReact }))),
    javascript: lazy(() => import('react-icons/di').then(mod => ({ default: mod.DiJavascript }))),
    typescript: lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiTypescript }))),
    nextjs: lazy(() => import('react-icons/tb').then(mod => ({ default: mod.TbBrandNextjs }))),
    d3: lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiD3Dotjs }))),
    tableau: lazy(() => import('react-icons/si').then(mod => ({ default: mod.SiTableau }))),
    git: lazy(() => import('react-icons/di').then(mod => ({ default: mod.DiGit }))),
}

interface SkillCardProps {
    name: string
    iconName: string
    level: number
    description: string
}

export default function SkillCard({ name, iconName, level, description }: SkillCardProps) {
    const Icon = icons[iconName as keyof typeof icons]

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-blue-500/10 rounded-full" />

                {Icon && <Icon className="text-4xl text-blue-600 mb-4" />}

                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>

                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Proficiency</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-600 rounded-full"
                        />
                    </div>
                </div>
            </motion.div>
        </Suspense>
    )
}
