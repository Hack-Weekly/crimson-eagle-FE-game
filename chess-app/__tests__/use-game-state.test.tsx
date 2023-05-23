import '../__mocks__/local-storage-mock'
import { act, renderHook } from '@testing-library/react'
import useGameState from '@/store/use-game-state'

describe('Use Game State', () => {

    beforeEach(() => {
        //     
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should try to read from localstorage', () => {
        const { result } = renderHook(() => useGameState())

        expect(jest.isMockFunction(window.localStorage.getItem)).toBeTruthy()
        expect(window.localStorage.getItem).toHaveBeenCalled()
        expect(window.localStorage.getItem).toHaveBeenCalledWith('crimson-eagle-chess-game')
        expect(result.current.state.game?.gameId).toBe('123456')
    })

    it('should fetch the current game from the api and save it', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ nowPlaying: [{ gameId: 'fetchedGame' }]})
        })) as jest.Mock

        const { result } = renderHook(() => useGameState())
        
        await act(async () => {
            await result.current.fetchGame()            
        })

        expect(jest.isMockFunction(global.fetch)).toBeTruthy()
        expect(global.fetch).toHaveBeenCalled()
        expect(result.current.state.game?.gameId).toBe('fetchedGame')
        expect(window.localStorage.setItem).toHaveBeenCalled()
        expect(window.localStorage.setItem).toHaveBeenCalledWith('crimson-eagle-chess-game', JSON.stringify({
            game: { gameId: 'fetchedGame' }
        }))
    })

    it('should remove item from storage if game is empty', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ nowPlaying: []})
        })) as jest.Mock

        const { result } = renderHook(() => useGameState())
        
        await act(async () => {
            await result.current.fetchGame()            
        })
        
        expect(global.fetch).toHaveBeenCalled()
        expect(result.current.state.game).toBeNull()
        expect(window.localStorage.removeItem).toHaveBeenCalled()
        expect(window.localStorage.removeItem).toHaveBeenCalledWith('crimson-eagle-chess-game')
    })
})