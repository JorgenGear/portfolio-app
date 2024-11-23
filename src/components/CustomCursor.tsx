'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })

            const target = e.target as HTMLElement
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-blue-500 rounded-full mix-blend-difference pointer-events-none z-50"
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed top-0 left-0 w-4 h-4 border border-blue-500 rounded-full mix-blend-difference pointer-events-none z-50"
                    animate={{
                        x: position.x - 8,
                        y: position.y - 8,
                        scale: isPointer ? 1.5 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                        delay: (i + 1) * 0.02,
                    }}
                />
            ))}
        </>
    )
}
