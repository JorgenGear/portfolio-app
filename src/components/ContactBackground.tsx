'use client'

import { useRef, useEffect } from 'react'

interface Point {
    x: number
    y: number
    active: boolean
    pulsePhase: number
    connections: number[]
}

export default function ContactBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()
    const pointsRef = useRef<Point[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d', { alpha: false })
        if (!context) return
        const ctx = context

        const resizeCanvas = () => {
            if (!canvas) return
            const { width, height } = canvas.getBoundingClientRect()
            canvas.width = width * window.devicePixelRatio
            canvas.height = height * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create circuit board grid
        const gridSize = 40
        const rows = Math.ceil(canvas.height / gridSize)
        const cols = Math.ceil(canvas.width / gridSize)

        // Initialize points with random connections
        pointsRef.current = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const connections: number[] = []
                // Add random connections to nearby points
                if (Math.random() > 0.5 && j < cols - 1) connections.push((i * cols) + j + 1) // right
                if (Math.random() > 0.5 && i < rows - 1) connections.push(((i + 1) * cols) + j) // down
                
                pointsRef.current.push({
                    x: j * gridSize,
                    y: i * gridSize,
                    active: Math.random() > 0.8,
                    pulsePhase: Math.random() * Math.PI * 2,
                    connections
                })
            }
        }

        const mouse = { x: 0, y: 0 }
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = (e.clientX - rect.left) * window.devicePixelRatio
            mouse.y = (e.clientY - rect.top) * window.devicePixelRatio
        }
        canvas.addEventListener('mousemove', handleMouseMove)

        function animate() {
            if (!canvas) return
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            pointsRef.current.forEach((point, index) => {
                const dx = mouse.x - point.x
                const dy = mouse.y - point.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = 150 * window.devicePixelRatio

                if (distance < maxDistance) {
                    point.active = true
                    point.pulsePhase += 0.1
                }

                if (point.active) {
                    const pulse = Math.sin(point.pulsePhase) * 0.5 + 0.5
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + pulse * 0.4})`
                    ctx.fill()

                    // Draw circuit connections
                    point.connections.forEach(targetIndex => {
                        const target = pointsRef.current[targetIndex]
                        ctx.beginPath()
                        ctx.moveTo(point.x, point.y)
                        ctx.lineTo(target.x, target.y)
                        ctx.strokeStyle = `rgba(34, 197, 94, ${0.2 + pulse * 0.2})`
                        ctx.lineWidth = 1
                        ctx.stroke()
                    })
                }
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            canvas.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
        />
    )
}
