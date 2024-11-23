'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TiltCard from '@/components/TiltCard'

interface Card {
    id: number
    value: string
    isFlipped: boolean
    isMatched: boolean
}

const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯']

export default function MemoryGame() {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [isWon, setIsWon] = useState(false)

    useEffect(() => {
        initializeGame()
    }, [])

    const initializeGame = () => {
        const shuffledCards = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((value, index) => ({
                id: index,
                value,
                isFlipped: false,
                isMatched: false
            }))
        setCards(shuffledCards)
        setFlippedCards([])
        setMoves(0)
        setIsWon(false)
    }

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) return

        const newCards = [...cards]
        newCards[id].isFlipped = true
        setCards(newCards)

        const newFlippedCards = [...flippedCards, id]
        setFlippedCards(newFlippedCards)

        if (newFlippedCards.length === 2) {
            setMoves(m => m + 1)
            const [first, second] = newFlippedCards
            if (cards[first].value === cards[second].value) {
                newCards[first].isMatched = true
                newCards[second].isMatched = true
                setCards(newCards)
                setFlippedCards([])
                
                if (newCards.every(card => card.isMatched)) {
                    setIsWon(true)
                }
            } else {
                setTimeout(() => {
                    newCards[first].isFlipped = false
                    newCards[second].isFlipped = false
                    setCards(newCards)
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="text-lg">Moves: {moves}</div>
                <button 
                    onClick={initializeGame}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    New Game
                </button>
            </div>

            <motion.div 
                className="grid grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {cards.map(card => (
                    <TiltCard key={card.id}>
                        <motion.div
                            className={`aspect-square flex items-center justify-center text-4xl 
                                      cursor-pointer rounded-xl ${
                                card.isFlipped || card.isMatched 
                                    ? 'bg-white text-gray-900' 
                                    : 'bg-blue-600'
                            }`}
                            onClick={() => handleCardClick(card.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {(card.isFlipped || card.isMatched) ? card.value : '?'}
                        </motion.div>
                    </TiltCard>
                ))}
            </motion.div>

            {isWon && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                >
                    <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
                    <p>You won in {moves} moves!</p>
                </motion.div>
            )}
        </div>
    )
}