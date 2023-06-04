type Color = 'w' | 'b'
type Result = 'win' | 'loss' | 'draw' | null

export type Player = {
    id: string,
    clerkId: string,
    username: string,
    rating: number,
}
export type PlayerWithGames = Player & {
    games: {
        gameId: number,
        playerId: number,
        color: Color,
        result: Result,
    }[],
}

export type Game = {
    id: number,
    createdAt: string, // Date
    updatedAt: string, // Date
    fen: string, // ex: 'r1bqkbnr/pppp2pp/2n1pp2/8/8/3PP3/PPPB1PPP/RN1QKBNR w KQkq - 2 4',
    pgn: string, // ex: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6',
    isFinished: boolean,
}

export type GameWithPlayers = Game & {
    players: {
        gameId: number,
        playerId: number,
        color: Color,
        result: Result,
        player: Player,
    }[],
}