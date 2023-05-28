const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
    try {
        const johndoe = await prisma.player.upsert({
            where: { id: 1 },
            create: {
                clerkId: 'johndoe',
                username: 'johndoe',
            },
            update: {},
        })
        const janedoe = await prisma.player.upsert({
            where: { id: 2 },
            create: {
                clerkId: 'janedoe',
                username: 'janedoe',
            },
            update: {},
        })
        console.log('Players created.', [johndoe, janedoe])

        await prisma.game.create({
            data: {
                fen: '2k4r/pq1r2pp/B1P1pp2/3pn3/5B2/P1P5/2P1QPPP/6K1 b - - 0 19',
                pgn: `1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 7.Nf3
                Bd7 8.dxc5 Ng6 9.Bd3 Nc6 10.Rb1 Qc7 11.O-O Ncxe5 12.Nxe5 Nxe5
                13.Bf4 O-O-O 14.Qe2 f6 15.Ba6 Bc6 16.Rxb7 Bxb7 17.Rb1 Rd7
                18.Rxb7 Qxb7 19.c6 1-0`,
                isFinished: true,
                players: {
                    create: [
                        {
                            color: 'b',
                            result: 'win',
                            player: {
                                connect: {
                                    id: johndoe.id
                                },
                            },
                        },
                        {
                            color: 'w',
                            result: 'loss',
                            player: {
                                connect: {
                                    id: janedoe.id
                                },
                            },
                        },
                    ],
                },
            },
        })
        await prisma.game.create({
            data: {
                fen: '4r1k1/p6p/1p1p2p1/2pr4/P1b5/4R3/1PQBK1Pq/4R3 w - - 0 28',
                pgn: `1.d4 Nf6 2.c4 c5 3.d5 e6 4.Nc3 exd5 5.cxd5 d6 6.Nf3 g6 7.e4
                Bg7 8.Be2 O-O 9.O-O Re8 10.Nd2 Na6 11.Re1 Nc7 12.a4 b6 13.Qc2
                Ng4 14.h3 Nxf2 15.Kxf2 Qh4+ 16.Kf1 Bd4 17.Nd1 Qxh3 18.Bf3 Qh2
                19.Ne3 f5 20.Ndc4 fxe4 21.Bxe4 Ba6 22.Bf3 Re5 23.Ra3 Rae8
                24.Bd2 Nxd5 25.Bxd5+ Rxd5 26.Ke2 Bxe3 27.Rxe3 Bxc4+ 0-1`,
                isFinished: true,
                players: {
                    create: [
                        {
                            color: 'b',
                            result: 'win',
                            player: {
                                connect: {
                                    id: janedoe.id
                                },
                            },
                        },
                        {
                            color: 'w',
                            result: 'loss',
                            player: {
                                connect: {
                                    id: johndoe.id
                                },
                            },
                        },
                    ],
                },
            },
        })
        await prisma.game.create({
            data: {
                fen: '2k1rb1r/ppp2p1p/3p4/3n1b2/5BpP/3N4/KP1N2P1/3R1B1R w - - 0 17',
                pgn: `1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6
                7. Nd3 Nxe4 8. Bxf4 Qe7 9. Qe2 Nc6 10. c3 Bf5 11. Nd2 O-O-O
                12. O-O-O Re8 13. d5 Nxc3 14. Qxe7 Nxa2+ 15. Kb1 Nxe7 16. Kxa2
                Nxd5 0-1`,
                isFinished: true,
                players: {
                    create: [
                        {
                            color: 'b',
                            result: 'win',
                            player: {
                                connect: {
                                    id: johndoe.id
                                },
                            },
                        },
                        {
                            color: 'w',
                            result: 'loss',
                            player: {
                                connect: {
                                    id: janedoe.id
                                },
                            },
                        },
                    ],
                },
            },
        })
        console.log('Games created.')
    }
    catch (e) {
        console.error(e)
        process.exit(1)
    }
    finally {
        await prisma.$disconnect()
    }
}

load()