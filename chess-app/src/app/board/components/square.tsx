import { ReactNode } from 'react'
import type { Color } from 'chess.js'

type SquareProps = {
    color: Color,
    bgColor: Color,
    highlight: boolean,
    children: ReactNode,
}
const Square = ({ color, bgColor, highlight, children }: SquareProps) => {
    const colors = color == 'w' ? 'text-white' : 'text-black'
    const squareColors = bgColor == 'w' ? 'bg-amber-300' : 'bg-amber-900'
    return (
        <button className={ `w-1/8 h-1/8 aspect-square font-medium text-3xl
            border border-slate-500 ${ colors } ${ squareColors } ${ highlight ? 'outline outline-green-300' : ''}` }>
            { children }
        </button>
    )
}

export default Square