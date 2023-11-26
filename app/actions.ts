'use server'
import { db } from 'app/db'
 
export async function createGame(formData: FormData) {
  'use server'

  const title = formData.get('title') as string

  const game = await db.game.create({
    data: {
      gamePlay: '',
      white: '',
      black: ''
    }
  })
}
