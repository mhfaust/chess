import { db } from "./db"
import { redirect } from "next/navigation"

export default function Home() {
  
  async function createGame(formData: FormData) {
    'use server'
  
    // const title = formData.get('title') as string
  
    const game = await db.game.create({
      data: {
        gamePlay: '',
        white: '',
        black: ''
      }
    })

    console.log(game)

    redirect(`/play/${game.id}`)
  }

  return (
    <form action={createGame}>
      <button type="submit">Play</button>
    </form>
  )
}
