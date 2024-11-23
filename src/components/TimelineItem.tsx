'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface TimelineItemProps {
    title: string
    company: string
    date: string
    location?: string
    description: string[]
    delay?: number
}

export default function TimelineItem({ title, company, date, location, description, delay = 0 }: TimelineItemProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-50, 0, 0, -50])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x }}
            className="relative pl-4 border-l-2 border-blue-600"
        >
            <div className="absolute -left-[9px] top-2 w-4 h-4 bg-blue-600 rounded-full">
                <div className="absolute inset-0 rounded-full animate-ping bg-blue-600 opacity-25" />
            </div>

            <h3 className="font-bold text-xl">{title}</h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                <span>{company}</span>
                <span>•</span>
                <span>{date}</span>
                {location && (
                    <>
                        <span>•</span>
                        <span>{location}</span>
                    </>
                )}
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </motion.div>
    )
}
