Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: jest.fn((key: string) => {
            const game = {
                gameId: '123456',
            }
            return JSON.stringify({ game })
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
    }
})