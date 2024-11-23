'use client'

import { motion } from 'framer-motion'

interface SkillBarProps {
    skill: string
    level: number
    delay?: number
}

export default function SkillBar({ skill, level, delay = 0 }: SkillBarProps) {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="font-medium">{skill}</span>
                <span className="text-gray-600 dark:text-gray-400">{level}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    className="h-full bg-blue-600 rounded-full"
                />
            </div>
        </div>
    )
}
