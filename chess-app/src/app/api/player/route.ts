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
    .then(NextResponse.json)
    .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
}