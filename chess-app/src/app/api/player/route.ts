import { NextResponse } from 'next/server'
import { prisma } from '@/db'

export const GET = async () => {
    return prisma.player.findMany({
        orderBy: {
            username: 'desc',
        },
        include: {
            games: true,
        },
    })
    .then(players => NextResponse.json({
        data: players,
    }))
    .catch(_ => NextResponse.json({
        message: 'An error occured in the database',
    }, {
        status: 500,
    }))
}