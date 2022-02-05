import { Avatar, Box, Divider, Heading, HStack, Link, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"
import PageWrapper from "../PageWrapper"
import { Slot } from "./Slot"
import useDeck from "../../hooks/useDeck"
import { Hold } from "./Hold"

const EmplacementSlot = ({ slot, ...props }) => (
  <HStack
    borderWidth={2}
    borderColor='gray'
    borderRadius={4}
    padding={2}
    {...props}>
    <Avatar size='sm' name={slot.card.name} src={slot.card.image_url} />
    <Slot deckSlot={slot} showQuantity={false} />
  </HStack>
)

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
            <SimpleGrid columns={[1, 2]} spacing={2}>
              {emplacements.map(e => <EmplacementSlot key={e.card.id} slot={e} />)}
            </SimpleGrid>
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