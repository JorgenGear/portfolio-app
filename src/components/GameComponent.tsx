'use client'

import { motion } from 'framer-motion'

interface Game {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    component: React.ComponentType
}

interface GameComponentProps {
    game: Game
}

export default function GameComponent({ game }: GameComponentProps) {
    const GameToRender = game.component

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
        >
            <h2 className="text-3xl font-bold mb-8 text-center">{game.title}</h2>
            <GameToRender />
        </motion.div>
    )
}