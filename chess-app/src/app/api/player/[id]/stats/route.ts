import { NextResponse } from 'next/server'
import { prisma } from '@/db'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const id = parseInt(params.id)

    // get result statistics
    type Stats = {
        wins: number,
        draws: number,
        losses: number,
    }[]
    return prisma.$queryRaw<Stats>`SELECT cast(count(CASE "result" WHEN 'win' THEN 1 ELSE null END) as Integer) as wins,
        cast(count(CASE "result" WHEN 'draw' THEN 1 ELSE null END) as Integer) as draws,
        cast(count(CASE "result" WHEN 'loss' THEN 1 ELSE null END) as Integer) as losses
        FROM "PlayersInGames" WHERE "playerId" = ${ id }`
        .then(NextResponse.json)
        .catch((error) => NextResponse.json({ message: 'An error occured in the database: ' + error }, { status: 500 }))
}