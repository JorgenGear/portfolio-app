'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import TiltCard from '@/components/TiltCard'
import MemoryGame from '@/components/MemoryGame'
import SnakeGame from '@/components/SnakeGame'
import PuzzleGame from '@/components/PuzzleGame'
import GameComponent from '@/components/GameComponent'

interface Game {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    component: React.ComponentType
}

const games: Game[] = [
    {
        id: 'memory',
        title: 'Memory Match',
        description: 'Test your memory by matching pairs of cards',
        difficulty: 'Easy',
        component: MemoryGame
    },
    {
        id: 'snake',
        title: 'Snake',
        description: 'Classic snake game with a modern twist',
        difficulty: 'Medium',
        component: SnakeGame
    },
    {
        id: 'puzzle',
        title: 'Sliding Puzzle',
        description: 'Arrange the tiles in the correct order',
        difficulty: 'Hard',
        component: PuzzleGame
    }
]

export default function Games() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-12"
                >
                    Mini Games
                </motion.h1>

                {!selectedGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game) => (
                            <TiltCard key={game.id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedGame(game.id)}
                                    className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl cursor-pointer"
                                >
                                    <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                                    <p className="text-gray-300 mb-4">{game.description}</p>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                                        game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                        'bg-red-500/20 text-red-300'
                                    }`}>
                                        {game.difficulty}
                                    </span>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                    >
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="absolute -top-8 left-0 text-gray-400 hover:text-white"
                        >
                            ← Back to games
                        </button>
                        {games.find(g => g.id === selectedGame)?.component && 
                            <div className="mt-8">
                                <GameComponent game={games.find(g => g.id === selectedGame)!} />
                            </div>
                        }
                    </motion.div>
                )}
            </div>
        </div>
    )
}
