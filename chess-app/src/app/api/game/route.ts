import { NextResponse } from 'next/server'
import { Chess } from 'chess.js'
import type { Game, Player } from '@/types/game'
import { prisma } from '@/db'

const games: Game[] = [
    {
        gameId: '1',
        players: [
            {
                id: '1',
                clerkId: 'AI',
                username: 'johndoe',
                rating: 100,
            },
            {
                id: '2',
                clerkId: 'id-in-Clerk',
                username: 'janedoe',
                rating: 100,
            },
        ],
        fen: 'r1bqkbnr/pppp2pp/2n1pp2/8/8/3PP3/PPPB1PPP/RN1QKBNR w KQkq - 2 4',
        pgn: 'b8c6',
        isFinished: false,
    }
]

export const GET = async () => {
    return prisma.game.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            players: true,
        },
    })
    .then(games => NextResponse.json({
        data: games,
    }))
    .catch(_ => NextResponse.json({
        message: 'An error occured in the database',
    }, {
        status: 500,
    }))
}

// create new blank game with players
export const POST = async (request: Request) => {
    const { players }: { players: Player[] } = await request.json()

    if (players.length != 2) {
        return NextResponse.json({ message: 'Please provide two players.' }, {
            status: 400,
        })
    }
    if (!players[0].color || !players[1].color || players[0].color == players[1].color) {
        return NextResponse.json({ message: 'Please provide the players\'s colors.' }, {
            status: 400,
        })
    }

    const chess = new Chess()    

    return prisma.game.create({
        data: {
            fen: chess.fen(),
            pgn: chess.pgn(),
            isFinished: false,
            players: {
                create: [
                    {
                        color: players[0].color,
                        player: {
                            connectOrCreate: {
                                where: {
                                    id: players[0].id,
                                },
                                create: {
                                    username: players[0].username,
                                },
                            }
                        }
                    },
                    {
                        color: players[1].color,
                        player: {
                            connectOrCreate: {
                                where: {
                                    id: players[1].id,
                                },
                                create: {
                                    username: players[1].username,
                                },
                            }
                        }
                    },
                ]
            }
        }
    })
    .then(game => NextResponse.json({
        data: game,
    }))
    .catch(_ => NextResponse.json({
        message: 'An error occured in the database',
    }, {
        status: 500,
    }))
}