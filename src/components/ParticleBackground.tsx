'use client'

import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particles = useRef<Particle[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            particles.current = []
            for (let i = 0; i < 50; i++) {
                particles.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.current.forEach(particle => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                if (particle.x > canvas.width) particle.x = 0
                if (particle.x < 0) particle.x = canvas.width
                if (particle.y > canvas.height) particle.y = 0
                if (particle.y < 0) particle.y = canvas.height

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        resizeCanvas()
        createParticles()
        animate()

        window.addEventListener('resize', resizeCanvas)
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
        />
    )
}
