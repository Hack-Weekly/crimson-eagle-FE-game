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

const storagekey = 'crimson-eagle-chess-game'
const readGame = (): Game | null => {
    const gameJson = localStorage.getItem(storagekey)

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
        localStorage.setItem(storagekey, JSON.stringify({
            game: gameState.game,
        }))
    } else {
        localStorage.removeItem(storagekey)
    }
}

const fetchGame = async (): Promise<void> => {
    return fetch('https://lichess.org/api/account/playing')
        .then(res => res.json())
        .then(data => data.nowPlaying[0] ? data.nowPlaying[0] : null)
        .then(game => {
            gameState.game = game
            storeGame()
        })
}

export type UseGameState = {
    state: GameState,
    fetchGame: () => Promise<void>,
    storeGame: () => void,
}
const useGameState = (): UseGameState => ({
    state: useSnapshot(gameState),
    fetchGame,
    storeGame,
})

export default useGameState