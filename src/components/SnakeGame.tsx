'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

interface Position {
    x: number
    y: number
}

export default function SnakeGame() {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
    const [food, setFood] = useState<Position>({ x: 15, y: 15 })
    const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT')
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        }
        setFood(newFood)
    }, [])

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }])
        setDirection('RIGHT')
        setIsGameOver(false)
        setScore(0)
        generateFood()
        setIsPaused(false)
    }

    const moveSnake = useCallback(() => {
        if (isGameOver || isPaused) return

        setSnake(prevSnake => {
            const newSnake = [...prevSnake]
            const head = { ...newSnake[0] }

            switch (direction) {
                case 'UP':
                    head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE
                    break
                case 'DOWN':
                    head.y = (head.y + 1) % GRID_SIZE
                    break
                case 'LEFT':
                    head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE
                    break
                case 'RIGHT':
                    head.x = (head.x + 1) % GRID_SIZE
                    break
            }

            // Check collision with self
            if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setIsGameOver(true)
                return prevSnake
            }

            newSnake.unshift(head)

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => prev + 1)
                generateFood()
            } else {
                newSnake.pop()
            }

            return newSnake
        })
    }, [direction, food, generateFood, isGameOver, isPaused])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    setDirection(prev => prev !== 'DOWN' ? 'UP' : prev)
                    break
                case 'ArrowDown':
                    setDirection(prev => prev !== 'UP' ? 'DOWN' : prev)
                    break
                case 'ArrowLeft':
                    setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev)
                    break
                case 'ArrowRight':
                    setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev)
                    break
                case ' ':
                    setIsPaused(prev => !prev)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    useEffect(() => {
        const gameLoop = setInterval(moveSnake, INITIAL_SPEED)
        return () => clearInterval(gameLoop)
    }, [moveSnake])

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full max-w-[400px] mb-4">
                <div className="text-lg">Score: {score}</div>
                <button 
                    onClick={() => setIsPaused(prev => !prev)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>

            <motion.div 
                className="relative bg-gray-800 rounded-lg overflow-hidden"
                style={{ 
                    width: GRID_SIZE * CELL_SIZE, 
                    height: GRID_SIZE * CELL_SIZE 
                }}
            >
                {snake.map((segment, index) => (
                    <motion.div
                        key={index}
                        className="absolute bg-green-500"
                        style={{
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            margin: 1
                        }}
                    />
                ))}
                <motion.div
                    className="absolute bg-red-500"
                    style={{
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        margin: 1
                    }}
                />
            </motion.div>

            {isGameOver && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                >
                    <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                    <p className="mb-4">Final Score: {score}</p>
                    <button 
                        onClick={resetGame}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Play Again
                    </button>
                </motion.div>
            )}
        </div>
    )
}