import { PrismaClient } from "@prisma/client"

export const db = new PrismaClient()

db.game.create({
  data: {
    gamePlay: '',
    white: '',
    black: '',
  }
})