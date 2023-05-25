-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fen" TEXT NOT NULL DEFAULT '',
    "pgn" TEXT NOT NULL DEFAULT '',
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayersInGames" (
    "gameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "PlayersInGames_pkey" PRIMARY KEY ("gameId","playerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_clerkId_key" ON "Player"("clerkId");

-- AddForeignKey
ALTER TABLE "PlayersInGames" ADD CONSTRAINT "PlayersInGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayersInGames" ADD CONSTRAINT "PlayersInGames_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
