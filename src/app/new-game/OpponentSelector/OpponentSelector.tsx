'use client'

import { User } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

const { Root, Trigger, Label, Item, Content } = Select;

type OpponentSelectorProps = {
  onSelect: (opponent: User) => void
}

const OpponentSelector = ({ onSelect }: OpponentSelectorProps) => {

  const [profiles, setProfiles] = useState([])

  const session = useSession()
  const userId = session?.data?.user?.id


  useEffect(() => {
    if (!userId) return

    fetch('/api/profiles')
      .then(res => res.json())
      .then(({ profiles }) => {
        setProfiles(profiles)
      })
  }, [userId])

  const filteredProfiles = profiles.filter((profile: User) => profile.id !== userId)

  const handleSelectOpponent = (profileId: string) => {
    const opponent = profiles.find((profile: User) => profile.id === profileId)
    if (opponent) {
      onSelect(opponent)
    }
  }

  return (
    <Flex direction='row' align='center' justify='between' gap='1'>
    Opponent: 
    <Root onValueChange={handleSelectOpponent}>
      <Trigger placeholder="Select an opponent">
        <Label>Opponent</Label>
      </Trigger>
      <Content>
        {filteredProfiles.map((profile: User) => (
          <Item 
            key={profile.id} 
            value={profile.id}
          >
            {profile.name}
          </Item>
        ))}
      </Content>
    </Root>
    </Flex>
  )
}

export default OpponentSelector