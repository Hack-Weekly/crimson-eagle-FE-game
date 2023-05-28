import { NextResponse } from 'next/server'
import { prisma } from '@/db'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const id = parseInt(params.id)
    
    return prisma.player.findUnique({
        where: { id },
        include: {
            games: {
                orderBy: {
                    game: {
                        createdAt: 'desc',
                    },
                },
            },
        },
    })
    .then(NextResponse.json)
    .catch(() => NextResponse.json({ message: 'An error occured in the database' }, { status: 500 }))
}