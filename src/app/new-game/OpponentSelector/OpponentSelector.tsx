'use client'

import { User } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import AutocompleteSelect from '@/components/AutocompleteSelect'

const { Root, Trigger, Label, Item, Content } = Select;

type OpponentSelectorProps = {
  onSelect: (opponent: User) => void
}

const OpponentSelector = ({ onSelect }: OpponentSelectorProps) => {

  const [opponentOptions, setOpponentOptions] = useState<User[]>([])
  const [search, setSearch] = useState('')

  const session = useSession()
  const userId = session?.data?.user?.id

  useEffect(() => {
    if (!userId) return
    // if (!userId || search.length < 2) return

    fetch('/api/profiles')
      .then(res => res.json())
      .then(({ profiles }: { profiles: User[]}) => {
        setOpponentOptions(profiles
          .filter(p => !!p.name)
        )
      })
  }, [search.length, userId])

  return (
    <Flex direction='row' align='center' justify='between' gap='1'>
      Opponent: 
      <AutocompleteSelect 
        options={opponentOptions} 
        onSelect={onSelect} 
        getLabel={user => user.name || '[no name]'}
      />
    </Flex>
  )
}

export default OpponentSelector