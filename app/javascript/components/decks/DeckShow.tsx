import { Avatar, Box, Divider, Heading, HStack, Link, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"
import PageWrapper from "../PageWrapper"
import useDeck from "../../hooks/useDeck"
import { Hold } from "./Hold"
import { Emplacements } from "./Emplacements"

export default ({ deck, current_user }) => {
  const deckbox = useDeck(deck)
  const {
    captain,
    emplacements,
    hold,
    splash,
    splashFactions
  } = deckbox

  return (
    <PageWrapper current_user={current_user}>
      <VStack alignItems='flex-start'>
        <Heading>{deck.name}</Heading>
        <Divider />
        <Stack direction={['column', 'row']} >
          {/* Left Column */}
          <VStack alignItems='flex-start'>
            <HStack>
              {captain && <Card displayMode="image" card={captain} width={180} />}
              <VStack alignItems='flex-start' justifyContent='flex-start'>
                {captain && <Text fontSize='2xl'>{captain.name}</Text>}
                <Text>{splash.reduce((m, s) => m + s.quantity, 0)}/6 splashes from {splashFactions}</Text>
                <Text>{hold.reduce((memo: number, slot: DeckSlot) => memo + slot.quantity, 0)} cards</Text>
              </VStack>
            </HStack>
            <Emplacements maxW='lg' deckbox={deckbox} />
            <Hold deckbox={deckbox} />
          </VStack>
          {/* Right Column */}
          <VStack alignItems='flex-start' alignSelf='flex-start'>
            <Link fontSize='2xl' fontWeight='bold' href={`/users/${deck.user.id}`}>{deck.user.name}</Link>
            <Box><Text>{deck.description}</Text></Box>
          </VStack>
        </Stack>
      </VStack>
    </PageWrapper >
  )
}