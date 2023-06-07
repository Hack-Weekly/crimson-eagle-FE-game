import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import { Chess, validateFen } from 'chess.js'
import { saveResults } from '../helpers'

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
    const id = parseInt(params.id)
    const { move }: { move: string | { from: string, to: string, promotion?: string } } = await request.json()

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
    const { ok, error } = validateFen(game.fen)
    if (!ok) {
        return NextResponse.json({ message: 'The game notation is malformed: ' + error }, { status: 400 })
    }

    chess.load(game.fen)
    const black = game.players.filter(p => p.color == 'b')[0]
    const white = game.players.filter(p => p.color == 'w')[0]
    
    // this should have been dealt with after the previous move
    if (chess.isGameOver()) {
        return saveResults(id, black, white, chess)
            .then(game => NextResponse.json({ message: 'This game is finished.', data: game }, { status: 400 }))
            .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
    }

    try {
        chess.move(move)
    }
    catch (error) {
        return NextResponse.json({ message: 'Illegal move. ' + error }, { status: 400 })
    }
        
    const fen = chess.fen()
    const pgn = chess.pgn()
    
    // check for game endings
    if (chess.isGameOver()) {
        return saveResults(id, black, white, chess, fen, pgn)
            .then(NextResponse.json) // game => NextResponse.json({ message, data: game })
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