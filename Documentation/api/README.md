# Backend routes

## Games

### GET /api/game

List games.
Response example:

```json
[{
    "id": 3,
    "createdAt": "2023-05-28T12:59:27.282Z",
    "updatedAt": "2023-05-28T12:59:27.282Z",
    "fen": "2k1rb1r/ppp2p1p/3p4/3n1b2/5BpP/3N4/KP1N2P1/3R1B1R w - - 0 17",
    "pgn": "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6\
    7. Nd3 Nxe4 8. Bxf4 Qe7 9. Qe2 Nc6 10. c3 Bf5 11. Nd2 O-O-O\n
    12. O-O-O Re8 13. d5 Nxc3 14. Qxe7 Nxa2+ 15. Kb1 Nxe7 16. Kxa2\n
    Nxd5 0-1",
    "isFinished": true,
    "players": [
      {
        "gameId": 3,
        "playerId": 2,
        "color": "w",
        "result": "loss",
        "player": {
          "id": 2,
          "clerkId": "janedoe",
          "username": "janedoe",
          "rating": 0
        }
      },
      {
        "gameId": 3,
        "playerId": 1,
        "color": "b",
        "result": "win",
        "player": {
          "id": 1,
          "clerkId": "johndoe",
          "username": "johndoe",
          "rating": 0
        }
      }
    ]
}]
```

### POST /api/game

Create a new game.
Body (1 or 2 players):

```ts
{
    players: {
        id: string,
        color: 'b' | 'w',
        username?: string
    }[]
}
```

Response example:

```json
{
	"id": 5,
	"createdAt": "2023-05-28T16:09:44.690Z",
	"updatedAt": "2023-05-28T16:09:44.690Z",
	"fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
	"pgn": "",
	"isFinished": false,
	"players": [
		{
			"gameId": 5,
			"playerId": 1,
			"color": "b",
			"result": null,
			"player": {
				"id": 1,
				"clerkId": "johndoe",
				"username": "johndoe",
				"rating": 0
			}
		}
	]
}
```

### GET /api/game/[ID]

Fetch one game by ID.
Response example:

```json
{
    "id": 3,
    "createdAt": "2023-05-28T12:59:27.282Z",
    "updatedAt": "2023-05-28T12:59:27.282Z",
    "fen": "2k1rb1r/ppp2p1p/3p4/3n1b2/5BpP/3N4/KP1N2P1/3R1B1R w - - 0 17",
    "pgn": "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. d4 d6\
    7. Nd3 Nxe4 8. Bxf4 Qe7 9. Qe2 Nc6 10. c3 Bf5 11. Nd2 O-O-O\n
    12. O-O-O Re8 13. d5 Nxc3 14. Qxe7 Nxa2+ 15. Kb1 Nxe7 16. Kxa2\n
    Nxd5 0-1",
    "isFinished": true,
    "players": [
      {
        "gameId": 3,
        "playerId": 2,
        "color": "w",
        "result": "loss",
        "player": {
          "id": 2,
          "clerkId": "janedoe",
          "username": "janedoe",
          "rating": 0
        }
      },
      {
        "gameId": 3,
        "playerId": 1,
        "color": "b",
        "result": "win",
        "player": {
          "id": 1,
          "clerkId": "johndoe",
          "username": "johndoe",
          "rating": 0
        }
      }
    ]
}
```

### PUT /api/game/[ID]

Make a move in a game identified by ID.
Body:

```ts
{
	move: string,
}
```

Response example:

```json
{
	"id": 5,
	"createdAt": "2023-05-28T16:09:44.690Z",
	"updatedAt": "2023-05-28T16:13:37.439Z",
	"fen": "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
	"pgn": "1. d4",
	"isFinished": false,
	"players": [
		{
			"gameId": 5,
			"playerId": 1,
			"color": "b",
			"result": null,
			"player": {
				"id": 1,
				"clerkId": "johndoe",
				"username": "johndoe",
				"rating": 0
			}
		}
	]
}
```

Error response example:

```json
{
    "message": "This game is finished."
},
"status": 400
```

## Players

### GET /api/player

List players.
Response example:

```json
[
	{
		"id": 1,
		"clerkId": "johndoe",
		"username": "johndoe",
		"rating": 0,
		"games": [
			{
				"gameId": 1,
				"playerId": 1,
				"color": "b",
				"result": "win"
			},
			{
				"gameId": 2,
				"playerId": 1,
				"color": "w",
				"result": "loss"
			}
		]
	}
]
```

### GET /api/player/top

List (at most) 10 players with the most wins.
Response example:

```json
[
	{
		"clerkId": "johndoe",
		"wins": 2
	},
	{
		"clerkId": "janedoe",
		"wins": 1
	}
]
```

### GET /api/player/[id]

Fetch one player by ID.
Response example:

```json
{
	"id": 1,
	"clerkId": "johndoe",
	"username": "johndoe",
	"rating": 0,
	"games": [
		{
			"gameId": 5,
			"playerId": 1,
			"color": "b",
			"result": null
		},
		{
			"gameId": 3,
			"playerId": 1,
			"color": "b",
			"result": "win"
		},
		{
			"gameId": 2,
			"playerId": 1,
			"color": "w",
			"result": "loss"
		},
		{
			"gameId": 1,
			"playerId": 1,
			"color": "b",
			"result": "win"
		}
	]
}
```

### GET /api/player/[ID]/stats

Get statistics of one player identified by ID.
Response example:

```json
[
	{
		"wins": 2,
		"draws": 0,
		"losses": 1
	}
]
```
