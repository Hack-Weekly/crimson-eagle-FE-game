import { useEffect } from 'react'
import { currentUser } from '@clerk/nextjs'
import { proxy, useSnapshot } from 'valtio'
import { Chess, type Square, type PieceSymbol, type Color } from 'chess.js'
import type { GameWithPlayers, PlayerWithGames } from '../types/game'

const chess = new Chess()

const storagekey = 'crimson-eagle-chess-game'
const readGame = (): GameWithPlayers | null => {
    const gameJson = (typeof window != 'undefined') ? localStorage.getItem(storagekey) : null

    if (gameJson) {
        const { game } = JSON.parse(gameJson)
        if (game) {
            try {
                chess.load(game.fen)
                return game
            }
            catch (e) {
                console.log(e)
                return null
            }
        }
    }

    return null
}

type BoardSquare = {
    square: Square;
    type: PieceSymbol;
    color: Color;
}

export type GameState = {
    game: GameWithPlayers | null,
    board: (BoardSquare | null)[][],
    chess: Chess,
}
const gameState = proxy<GameState>({
    game: null,
    board: Array(8).fill(Array(8).fill(null)),
    chess,
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

const fetchCurrentGame = async (id?: number): Promise<GameWithPlayers> => {
    const user = await currentUser()
    if (!user) {
        return Promise.reject(new Error('User not found.'))
    }

    return fetch(`/api/player/${ user.id }`)
    .then(res => res.json())
    .then(async (player: PlayerWithGames) => {
        
        const currentGames = (id) ?
            player.games.filter(game => game.result == null && game.gameId == id)
            : player.games.filter(game => game.result == null)

        if (currentGames.length > 0) {
            return fetch(`/api/game/${ currentGames[0].gameId }`)
                .then(res => res.json())
                .then((game : GameWithPlayers) => {
                    try {
                        gameState.chess.load(game.fen)
                        gameState.game = game
                        gameState.board = gameState.chess.board()
                        storeGame()
                        return game
                    }
                    catch (e) {
                        throw Error('Game fen malformed. ' + e)
                    }
                })
        }
        else {
            throw Error('No current games.')
        }
    })
}

type Players = { id: string, color: Color, username?: string }[]
const newGame = async (players: Players): Promise<GameWithPlayers> => {
    return fetch('/api/game/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ players }),
    })
    .then(async res => {
        const result = await res.json()
        if (res.status != 200) {
            throw Error('Error: ' + result.message)
        }
        try {
            gameState.chess.load(result.fen)
            gameState.game = result
            gameState.board = gameState.chess.board()
            storeGame()
            return result
        }
        catch (e) {
            throw Error('Game fen malformed. ' + e)
        }
    })
}

const getLegalMoves = (square: Square): string[] => {
    return gameState.chess.moves({ square })
}

const makeMove = (move: { from: string, to: string }): Promise<GameWithPlayers> => {
    try {
        gameState.chess.move(move)
        gameState.board = gameState.chess.board()
        storeGame()      
        
        return gameState.game ?
            Promise.resolve(gameState.game)
            : Promise.reject(new Error('Game not found.'))
    }
    catch (e) {
        return Promise.reject(new Error('Illegal move: ' + e))
    }
}

const makeMoveAndSave = async (move: { from: string, to: string }): Promise<GameWithPlayers> => {
    return fetch(`/api/game/${ gameState.game?.id }/move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ move }),
    })
    .then(async res => {
        const result = await res.json()
        if (res.status != 200 && !result.data) {
            throw Error('Error: ' + result.message)
        }
        if (result.data) {
            try {
                gameState.chess.load(result.data.fen)
                gameState.game = result.data
                gameState.board = gameState.chess.board()
                storeGame()
                return result.data
            }
            catch (e) {
                throw Error('Game fen malformed. ' + e)
            }
        }
        try {
            gameState.chess.load(result.fen)
            gameState.game = result
            gameState.board = gameState.chess.board()
            storeGame()
            return result
        }
        catch (e) {
            throw Error('Game fen malformed. ' + e)
        }
    })
}

const save = async (): Promise<GameWithPlayers> => {
    if (gameState.game) {
        return fetch(`/api/game/${ gameState.game.id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ fen: gameState.game.fen, pgn: gameState.game.pgn }),
        })
        .then(async res => {
            const result = await res.json()
            if (res.status != 200) {
                throw Error('Error: ' + result.message)
            }
            
            try {
                gameState.chess.load(result.fen)
                gameState.game = result
                gameState.board = gameState.chess.board()
                storeGame()
                return result
            }
            catch (e) {
                throw Error('Game fen malformed. ' + e)
            }
        })
    }
    return Promise.reject(new Error('Error: There\'s no game to save.'))
}

export type UseGameState = {
    state: GameState,
    fetchCurrentGame: () => Promise<GameWithPlayers>,
    newGame: (players: Players) => Promise<GameWithPlayers>,
    getLegalMoves: (square: Square) => string[],
    makeMove: (move: { from: string, to: string }) => Promise<GameWithPlayers>,
    makeMoveAndSave: (move: { from: string, to: string }) => Promise<GameWithPlayers>,
    save: () => Promise<GameWithPlayers>,
}
const useGameState = (): UseGameState => {

    useEffect(() => {
        if (!gameState.game) {
            gameState.game = readGame()
            gameState.board = gameState.chess.board()
        }
    }, [])

    return {
        state: useSnapshot(gameState) as GameState,
        fetchCurrentGame,
        newGame,
        getLegalMoves,
        makeMove,
        makeMoveAndSave,
        save,
    }
}

export default useGameState