'use client'

import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useRef } from 'react'

export default function MagneticButton({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const controls = useAnimation()

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const bounds = ref.current?.getBoundingClientRect()
        
        if (!bounds) return

        const x = clientX - (bounds.left + bounds.width / 2)
        const y = clientY - (bounds.top + bounds.height / 2)

        controls.start({
            x: x * 0.2,
            y: y * 0.2,
            transition: { type: "spring", stiffness: 150, damping: 15 }
        })
    }

    const handleMouseLeave = () => {
        controls.start({ x: 0, y: 0 })
    }

    return (
        <motion.div
            ref={ref}
            animate={controls}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            {children}
        </motion.div>
    )
}
