'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GRID_SIZE = 3
const TILE_SIZE = 100

interface Tile {
    value: number
    position: number
}

export default function PuzzleGame() {
    const [tiles, setTiles] = useState<Tile[]>([])
    const [moves, setMoves] = useState(0)
    const [isWon, setIsWon] = useState(false)

    const initializeGame = () => {
        const numbers = Array.from({ length: GRID_SIZE * GRID_SIZE - 1 }, (_, i) => i + 1)
        numbers.push(0) // Empty tile
        const shuffled = shuffleArray(numbers)
        
        // Check if puzzle is solvable
        while (!isSolvable(shuffled)) {
            shuffleArray(shuffled)
        }

        const newTiles = shuffled.map((value, index) => ({
            value,
            position: index
        }))
        
        setTiles(newTiles)
        setMoves(0)
        setIsWon(false)
    }

    useEffect(() => {
        initializeGame()
    }, [])

    const isSolvable = (puzzle: number[]) => {
        let inversions = 0
        for (let i = 0; i < puzzle.length - 1; i++) {
            for (let j = i + 1; j < puzzle.length; j++) {
                if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) {
                    inversions++
                }
            }
        }
        return inversions % 2 === 0
    }

    const shuffleArray = (array: number[]) => {
        const newArray = [...array]
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        }
        return newArray
    }

    const handleTileClick = (position: number) => {
        if (isWon) return

        const emptyTileIndex = tiles.findIndex(tile => tile.value === 0)
        const clickedTileIndex = tiles.findIndex(tile => tile.position === position)

        if (isAdjacent(emptyTileIndex, clickedTileIndex)) {
            const newTiles = [...tiles]
            ;[newTiles[emptyTileIndex].position, newTiles[clickedTileIndex].position] = 
            [newTiles[clickedTileIndex].position, newTiles[emptyTileIndex].position]
            
            setTiles(newTiles)
            setMoves(prev => prev + 1)

            // Check if puzzle is solved
            const isSolved = newTiles.every(tile => 
                tile.value === 0 || tile.position === tile.value - 1
            )
            if (isSolved) {
                setIsWon(true)
            }
        }
    }

    const isAdjacent = (pos1: number, pos2: number) => {
        const row1 = Math.floor(tiles[pos1].position / GRID_SIZE)
        const col1 = tiles[pos1].position % GRID_SIZE
        const row2 = Math.floor(tiles[pos2].position / GRID_SIZE)
        const col2 = tiles[pos2].position % GRID_SIZE

        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between w-full max-w-[400px] mb-4">
                <div className="text-lg">Moves: {moves}</div>
                <button 
                    onClick={initializeGame}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    New Game
                </button>
            </div>

            <motion.div 
                className="grid grid-cols-3 gap-1 bg-gray-800 p-1 rounded-lg"
                style={{ width: GRID_SIZE * TILE_SIZE + 8 }}
            >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, position) => {
                    const tile = tiles.find(t => t.position === position)
                    return (
                        <motion.div
                            key={position}
                            className={`
                                flex items-center justify-center 
                                ${tile?.value === 0 ? 'bg-transparent' : 'bg-blue-600 cursor-pointer hover:bg-blue-700'} 
                                rounded
                            `}
                            style={{
                                width: TILE_SIZE,
                                height: TILE_SIZE
                            }}
                            onClick={() => handleTileClick(position)}
                            whileHover={{ scale: tile?.value === 0 ? 1 : 1.05 }}
                            whileTap={{ scale: tile?.value === 0 ? 1 : 0.95 }}
                        >
                            {tile?.value !== 0 && (
                                <span className="text-2xl font-bold text-white">
                                    {tile?.value}
                                </span>
                            )}
                        </motion.div>
                    )
                })}
            </motion.div>

            {isWon && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                >
                    <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
                    <p>You solved it in {moves} moves!</p>
                </motion.div>
            )}
        </div>
    )
}