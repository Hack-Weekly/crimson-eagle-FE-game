"use client"

import { useState } from "react"
import { useAuth } from '@clerk/nextjs'
import useGameState from "@/store/use-game-state"
import Board from "./components/board"

const BoardPage = () => {

    const { state, fetchCurrentGame, newGame, getLegalMoves, makeMove, save } = useGameState()
    const [legalmoves, setLegalmoves] = useState([''])
    const [history, setHistory] = useState([''])
    const [saved, setSaved] = useState('')

    const { userId } = useAuth()

    const startNewGame = () => {
        newGame([{
            id: 'johndoe',
            color: 'b',
        }])
    }

    const getMovesForB2 = () => {
        setLegalmoves(getLegalMoves('b2'))
    }

    const makeLocalMove = () => {
        makeMove({ from: 'b2', to: 'b4' })
            .then(game => {
                setHistory(['b2 -> b4'])
                console.log('game', game)
            })
            .catch(console.log)
    }

    const saveToDB = () => {
        save()
            .then(game => {
                setSaved('Saved.')
                console.log('game', game)
            })
    }

    return (
        <div className="h-full p-2 flex justify-center content-center bg-slate-700">
            <section className="w-full lg:w-2/3 flex flex-col">
                <h1 className="my-2 text-lg">Chess board</h1>
                <Board highlights={ legalmoves } />
            </section>
            <section className="w-full lg:w-1/3 pl-6 pr-4">
                <h2 className="mt-2 mb-8 text-lg">Functions</h2>
                <button className="my-2 px-3 py-2 bg-slate-500 rounded hover:bg-slate-400"
                    onClick={ startNewGame }>Start new game for user &quot;johndoe&quot;</button>
                <p>Saves game state to localstorage and the DB.</p>
                <button className="my-2 px-3 py-2 bg-slate-500 rounded hover:bg-slate-400"
                    onClick={ getMovesForB2 }>Get valid moves</button>
                <p>Gets legal moves for B2 (pawn) from chess.js.</p>
                <p>{ legalmoves.join(', ') }</p>
                <button className="my-2 px-3 py-2 bg-slate-500 rounded hover:bg-slate-400"
                    onClick={ makeLocalMove }>Make a move</button>
                <p>Makes a move locally, saves state to localstore.</p>
                <p>{ history.join(', ') }</p>
                <button className="my-2 px-3 py-2 bg-slate-500 rounded hover:bg-slate-400
                    disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:bg-slate-400"
                    disabled={ state.game == null ? true : false }
                    onClick={ saveToDB }>Save game state to DB</button>
                <p>Sends game state to the API. { state.game == null &&
                    'Disabled because there wasn\'t a game started either for "johndoe" or the logged in user.' }</p>
                <p>{ saved }</p>
                <button className="my-2 px-3 py-2 bg-slate-500 rounded hover:bg-slate-400
                    disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:bg-slate-400"
                    disabled={ !userId ? true : false }
                    onClick={ () => fetchCurrentGame() }>Fetch game of logged in user</button>
                <p>Fetches from the API.  { !userId &&
                    'Disabled because no user is logged in.' }</p>
            </section>
        </div>
    )
}

export default BoardPage