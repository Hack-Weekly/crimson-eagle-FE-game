import { NextResponse } from 'next/server'
import { prisma } from '@/db'

export const GET = async () => {

    /**
     * almost:
     * prisma.playersInGames.groupBy({
            by: ['playerId'],
            where: {
                result: 'win',
            },
            _count: {
                result: true,
            },
            orderBy: {
                _count: { result: 'desc' },
            },
            take: 10,
        })
     */
    type PlayersWithWins = {
        clerkid: string,
        wins: number,
    }[]
    return prisma.$queryRaw<PlayersWithWins>`SELECT p."clerkId" as clerkId, cast(count(pg."result") as Integer) as wins
        FROM "PlayersInGames" pg
        LEFT JOIN "Player" p ON p."id" = pg."playerId"
        WHERE pg."result" = 'win'
        GROUP BY pg."playerId", p."clerkId"`
    .then(NextResponse.json)
    .catch((error) => NextResponse.json({ message: 'An error occured in the database: ' + error }, { status: 500 }))
}