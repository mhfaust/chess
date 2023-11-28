-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "gamePlay" TEXT NOT NULL,
    "white" TEXT NOT NULL,
    "black" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerProfile" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PlayerProfile_pkey" PRIMARY KEY ("id")
);
