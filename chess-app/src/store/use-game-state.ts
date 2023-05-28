import { proxy, useSnapshot } from 'valtio'
import type { Game } from '../types/game'

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
    state: useSnapshot(gameState) as GameState,
    fetchGame,
    storeGame,
})

export default useGameState