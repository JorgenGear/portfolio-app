'use client'

import { useEffect, useRef } from 'react'

export default function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            const { width, height } = canvas.getBoundingClientRect()
            canvas.width = width * window.devicePixelRatio
            canvas.height = height * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const mouse = { x: 0, y: 0 }
        const points: Array<{ x: number; y: number; vx: number; vy: number }> = []

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        canvas.addEventListener('mousemove', handleMouseMove)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

            // Create interactive points
            if (points.length < 30) {
                points.push({
                    x: Math.random() * (canvas.width / window.devicePixelRatio),
                    y: Math.random() * (canvas.height / window.devicePixelRatio),
                    vx: (Math.random() - 0.5) * 1,
                    vy: (Math.random() - 0.5) * 1
                })
            }

            points.forEach(point => {
                const dx = mouse.x - point.x
                const dy = mouse.y - point.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 100) {
                    point.vx += dx * 0.005
                    point.vy += dy * 0.005
                }

                // Add base movement
                point.vx += (Math.random() - 0.5) * 0.1
                point.vy += (Math.random() - 0.5) * 0.1

                point.x += point.vx
                point.y += point.vy
                point.vx *= 0.98
                point.vy *= 0.98

                // Keep points within bounds
                if (point.x < 0) point.x = canvas.width / window.devicePixelRatio
                if (point.x > canvas.width / window.devicePixelRatio) point.x = 0
                if (point.y < 0) point.y = canvas.height / window.devicePixelRatio
                if (point.y > canvas.height / window.devicePixelRatio) point.y = 0

                ctx.beginPath()
                ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            canvas.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    )
}
