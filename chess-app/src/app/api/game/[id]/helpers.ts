import { PlayersInGames } from "@prisma/client"
import type { Chess } from "chess.js"

export const saveResults = async (
    id: number,
    black: PlayersInGames | null,
    white: PlayersInGames | null,
    chess: Chess,
    fen?: string,
    pgn?: string,
) => {
    
    const color = chess.turn()
    const isCheckmate = chess.isCheckmate()

    if (black) {
        await prisma.playersInGames.update({
            where: {
                gameId_playerId: {
                    gameId: id,
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
                    gameId: id,
                    playerId: white.playerId,
                }
            },
            data: {
                result: isCheckmate ? (color == 'w' ? 'loss' : 'win') : 'draw',
            }
        })
    }

    const data = (fen && pgn) ?
    {
        fen,
        pgn,
        isFinished: true,
    }
    : {
        isFinished: true,
    }

    return prisma.game.update({
        where: { id },
        data,
        include: {
            players: {
                include: {
                    player: true,
                }
            }
        },
    })
}