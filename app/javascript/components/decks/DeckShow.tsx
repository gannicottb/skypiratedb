import { Box, Divider, Flex, Heading, HStack, Link, SimpleGrid, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"
import PageWrapper from "../PageWrapper"

const Slot = ({ slot, ...props }) => (
  <Box {...props}>{slot.quantity}x <Link href={`/cards/${slot.card.id}`}>{slot.card.name}</Link></Box>
)

export default ({ deck, current_user }) => {

  const holdTypes = ["Asset", "Crew", "Maneuver", "Special Ammo"]
  const emplacementTypes = ["Cannon", "Structure"]

  const captain = deck.slots.filter(s => s.card.type == "Captain")[0].card
  const emplacements = deck.slots.filter(s => s.card.type == "Emplacement")
  const hold = deck.slots.filter(s => holdTypes.includes(s.card.type))

  const holdMap = holdTypes.reduce((o, ht) => {
    let group = hold.filter(h => h.card.type == ht)
    if (group.length > 0) { o[ht] = group }
    return o
  }, {})

  const splash = deck.slots.filter(s => s.card.faction != "Neutral" && s.card.faction != captain.faction)
  const splashFactions = new Set(splash.map(s => s.card.faction))

  return (
    <PageWrapper current_user={current_user}>
      <VStack alignItems='flex-start'>
        <Heading>{deck.name}</Heading>
        <Divider />
        <HStack>
          {/* Left Column */}
          <VStack alignItems='flex-start'>
            <HStack>
              <Card displayMode="image" card={captain} width={180} />
              <VStack alignItems='flex-start' justifyContent='flex-start'>
                <Text fontSize='2xl'>{captain.name}</Text>
                <Text>{splash.reduce((m, s) => m + s.quantity, 0)}/6 splashes from {splashFactions}</Text>
                <Text>{hold.reduce((memo: number, slot: DeckSlot) => memo + slot.quantity, 0)} cards</Text>
                <Box>
                  {emplacements.map(e => <Slot key={e.card.id} slot={e} />)}
                </Box>
              </VStack>
            </HStack>
            <Flex direction='column' flexWrap='wrap' height='md' width='lg'>
              {Object.keys(holdMap).map(t => <Box marginBlockEnd={4} key={`hold-${t}`}>
                <Text>{t}</Text>
                {holdMap[t].map(s => <Slot slot={s} key={`${s.quantity}x${s.card.id}`} />)}
              </Box>)}
            </Flex>
          </VStack>
          {/* Right Column */}
          <VStack alignItems='flex-start' alignSelf='flex-start'>
            <Text fontSize='2xl' fontWeight='bold'>{deck.user.name}</Text>
            <Box><Text>{deck.description}</Text></Box>
          </VStack>
        </HStack>
      </VStack>
    </PageWrapper >
  )
}