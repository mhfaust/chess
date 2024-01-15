'use client'

import { Flex } from "@radix-ui/themes"
import OpponentSelector from "./OpponentSelector"
import { use, useState } from "react"
import { User } from "next-auth/types"
import WhiteSelector, { PlaysWhite } from "./WhiteSelector/WhiteSelector"
import { useSession } from "next-auth/react"

const NewGamePage = () => {

  const [opponent, setOpponent] = useState<User>()
  const [playsWhite, setPlaysWhite] = useState<PlaysWhite>('random')
  const session = useSession()
  const userName = session.data?.user?.name

  if(!userName) return null

  return (<>
		<Flex direction='column' align='center' justify='between' gap='9'>
      <h1>New Game</h1>
      <OpponentSelector onSelect={setOpponent}/>
      <Flex direction='column' align='center' justify='between' gap='3'>
        {opponent?.name && (
          <>
            <h2>Who plays white?</h2>
            <WhiteSelector 
              userName={userName} 
              opponentName={opponent.name} 
              onWhiteSelect={setPlaysWhite}
            />
          </>
        )}
      </Flex>
    </Flex>
  </>
  )
}

export default NewGamePage