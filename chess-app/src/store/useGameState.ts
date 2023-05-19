import { proxy, useSnapshot } from 'valtio'

type Game = {
    gameId: string,
    color: 'black' | 'white',
    fen: string, // ex: 'r1bqkbnr/pppp2pp/2n1pp2/8/8/3PP3/PPPB1PPP/RN1QKBNR w KQkq - 2 4',
    hasMoved: boolean,
    isMyTurn: boolean,
    lastMove: string // ex: 'b8c6',
    opponent: {
        id: string,
        username: string,
        rating: number,
    },
    secondsLeft: number,
}

const readGame = (): Game | null => {
    const gameJson = localStorage.getItem('crimson-eagle-chess-game')

    if (gameJson) {
        const { game } = JSON.parse(gameJson)
        if (game) {
            return game
        }
    }

    return null
}

export type GameState = {
    game: Game | null,
}
const gameState = proxy<GameState>({
    game: readGame(),
})

const storeGame = () => {
    if (gameState.game) {
        localStorage.setItem('crimson-eagle-chess-game', JSON.stringify({
            game: gameState.game,
        }))
    }
}

const fetchGame = async (): Promise<Game | null> => {
    return fetch('https://lichess.org/api/account/playing')
        .then(res => res.json())
        .then(data => data.nowPlaying[0])
}

export type UseGameState = {
    state: GameState,
    fetchGame: () => Promise<Game | null>,
    storeGame: () => void,
}
const useGameState = (): UseGameState => ({
    state: useSnapshot(gameState),
    fetchGame,
    storeGame,
})

export default useGameState