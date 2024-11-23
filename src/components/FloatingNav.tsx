'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function FloatingNav() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <>
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Floating Nav (shows only when scrolled) */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: scrollYProgress.get() > 0.1 ? 0 : -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg z-40"
            >
                <div className="flex gap-4 text-sm font-medium">
                    {isHome ? (
                        <>
                            <a href="#about" className="hover:text-blue-600">About</a>
                            <a href="#projects" className="hover:text-blue-600">Projects</a>
                            <a href="#contact" className="hover:text-blue-600">Contact</a>
                        </>
                    ) : (
                        <span className="text-blue-600">
                            {pathname.substring(1).charAt(0).toUpperCase() + pathname.slice(2)}
                        </span>
                    )}
                </div>
            </motion.div>
        </>
    )
}
