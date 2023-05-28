import { NextResponse } from 'next/server'
import { Chess } from 'chess.js'
import { prisma } from '@/db'

export const GET = async () => {
    return prisma.game.findMany({
        orderBy: { createdAt: 'desc' },
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

// create new blank game with players
export const POST = async (request: Request) => {
    const { players }: { players: { id: string, color: 'b' | 'w', username?: string }[] } = await request.json()

    if (players.length < 1 || players.length > 2) {
        return NextResponse.json({ message: 'Please provide one or two players.' }, { status: 400 })
    }
    if ((players.length == 1 && !players[0].color)
        || (players.length == 2 && (!players[0].color || !players[1].color || players[0].color == players[1].color))) {
        return NextResponse.json({ message: 'Please provide the players\' colors.' }, { status: 400 })
    }

    const insertPlayers = await Promise.all(players.map(p => 
        prisma.player.upsert({
            where: { clerkId: p.id },
            create: {
                clerkId: p.id,
                username: p.username ? p.username : p.id,
            },
            update: {},
        })
        .then(player => ({
                color: p.color,
                player: {
                    connect: {
                        id: player.id,
                    },
                },
            }))
    ))

    const chess = new Chess()    

    return prisma.game.create({
        data: {
            fen: chess.fen(),
            pgn: chess.pgn(),
            isFinished: false,
            players: {
                create: insertPlayers,
            }
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