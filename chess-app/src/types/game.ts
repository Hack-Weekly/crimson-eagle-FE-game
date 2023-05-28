export type Player = {
    id: string,
    clerkId: string,
    username: string,
    rating: number,
    color?: 'black' | 'white',
}

export type Game = {
    gameId: string,
    players: Player[],
    fen: string, // ex: 'r1bqkbnr/pppp2pp/2n1pp2/8/8/3PP3/PPPB1PPP/RN1QKBNR w KQkq - 2 4',
    pgn: string, // ex: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6',
    isFinished: boolean,
    // whoseTurn: 'black' | 'white', this is included in fen
    // hasMoved: boolean,
    // secondsLeft: number, won't care about this for now
}

export type CurrentGame = {
    gameId: string,
    color: 'black' | 'white',
    fen: string, // ex: 'r1bqkbnr/pppp2pp/2n1pp2/8/8/3PP3/PPPB1PPP/RN1QKBNR w KQkq - 2 4',
    hasMoved: boolean,
    isMyTurn: boolean,
    lastMove: string // ex: 'b8c6',
    opponent: Player,
    secondsLeft: number,
}