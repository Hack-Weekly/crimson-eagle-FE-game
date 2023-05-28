import { NextResponse } from 'next/server'
import { prisma } from '@/db'
import { Chess, validateFen } from 'chess.js'

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
    const { move }: { move: string } = await request.json()

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

    // this should have been dealt with after the previous move
    if (chess.isGameOver()) {
        return prisma.game.update({
            where: { id },
            data: {
                isFinished: true,
            },
            include: {
                players: {
                    include: {
                        player: true,
                    }
                }
            },
        })
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
        const isCheckmate = chess.isCheckmate()
        /* const message = isCheckmate ? 'Checkmate'
            : (chess.isDraw() ? 'Draw' : 'Stalemate') */
        
        // save results
        const color = chess.turn()
        const black = game.players.filter(p => p.color == 'b')[0]
        const white = game.players.filter(p => p.color == 'w')[0]
        if (black) {
            await prisma.playersInGames.update({
                where: {
                    gameId_playerId: {
                        gameId: game.id,
                        playerId: black.playerId,
                    }
                },
                data: {
                    result: isCheckmate ? (color == 'b' ? 'loss' : 'win') : 'draw',
                }
            })
        }
        if (white) {
            await prisma.playersInGames.update({
                where: {
                    gameId_playerId: {
                        gameId: game.id,
                        playerId: white.playerId,
                    }
                },
                data: {
                    result: isCheckmate ? (color == 'w' ? 'loss' : 'win') : 'draw',
                }
            })
        }

        return prisma.game.update({
            where: { id },
            data: {
                fen,
                pgn,
                isFinished: true,
            },
            include: {
                players: {
                    include: {
                        player: true,
                    }
                }
            },
        })
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