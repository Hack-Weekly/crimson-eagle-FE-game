import { NextResponse } from 'next/server'
import { prisma } from '@/db'

export const GET = async ({ params }: { params: { id: string } }) => {
    const id = parseInt(params.id)
    return prisma.player.findUnique({
        where: { id },
        include: {
            games: true,
        },
    })
    .then(player => NextResponse.json({
        data: player,
    }))
    .catch(_ => NextResponse.json({
        message: 'An error occured in the database',
    }, {
        status: 500,
    }))
}