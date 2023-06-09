import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import { Chess, validateFen } from 'chess.js'
import type { Game } from '@/types/game'
import { saveResults } from './helpers'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {    
    const id = parseInt(params.id)
    return prisma.game.findUnique({
        where: { id },
        include: {
            players: {
                include: {
                    player: true,
                }
            }
        },
    })
    .then(NextResponse.json)
    .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
}

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    const id = parseInt(params.id)
    const { fen, pgn }: Partial<Game> = await request.json()

    if (!fen) {
        return NextResponse.json({ message: 'The game notation is needed.' }, { status: 400 })
    }

    const game = await prisma.game.findUnique({
        where: { id },
        include: {
            players: true,
        },
    })

    if (!game) {
        return NextResponse.json({ message: 'The game was not found in the database.' }, { status: 404 })
    }
    if (game.isFinished) {
        return NextResponse.json({ message: 'This game is finished.' }, { status: 400 })
    }

    const chess = new Chess()
    const { ok, error } = validateFen(fen)
    if (!ok) {
        return NextResponse.json({ message: 'The game notation is malformed: ' + error }, { status: 400 })
    }

    chess.load(fen)

    if (chess.isGameOver()) {
        const black = game.players.filter(p => p.color == 'b')[0]
        const white = game.players.filter(p => p.color == 'w')[0]

        return saveResults(id, black, white, chess, fen, pgn)
            .then(NextResponse.json)
            .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
    }

    return prisma.game.update({
        where: { id },
        data: {
            fen,
            pgn,
            isFinished: false,
        },
        include: {
            players: {
                include: {
                    player: true,
                }
            }
        },
    })
    .then(NextResponse.json)
    .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
}