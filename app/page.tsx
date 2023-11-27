import { createGame } from "app/actions"

export default function Home() {

  return (
    <form action={createGame}>
      <button type="submit">Play</button>
    </form>
  )
}
