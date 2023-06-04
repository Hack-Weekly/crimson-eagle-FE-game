"use client"

import useGameState from '@/store/use-game-state'
import Square from './square'

type BoardProps = {
    highlights?: string[]
}
const Board = ({ highlights }: BoardProps) => {
    
    const { state } = useGameState()

    const hl = highlights ? highlights.map(sq => {
        const col = sq.charCodeAt(0) - 97
        const row = 8 - parseInt(sq.charAt(1))
        return `${ col }${ row }`
    }) : []

    return (
        <div className="grow grid grid-cols-8">
            { state.board && state.board.map((row, i) => row.map((s, j) => (
                <Square key={ j }
                    highlight={ hl.includes(`${ j }${ i }`) }
                    color={ s ? s.color : 'w' }
                    bgColor={ i%2 ? (j%2 ? 'b' : 'w') : (j%2 ? 'w' : 'b')}>
                    { s ? s.type : '' }
                </Square>
            )))}
        </div>
    )
}

export default Board