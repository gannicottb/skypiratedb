import { Box, Divider, Heading, HStack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"
import PageWrapper from "../PageWrapper"

const Slot = ({ slot, ...props }) => (
  <Box {...props}>{slot.quantity} {slot.card.name}</Box>
)

export default ({ deck, current_user }) => {
  /*
    Cleaver Aggro
    -------------
    Captain     | Cleaver
    Card        | x/6 splash (Trader)
                | 30 cards
    
  */

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
          <Card displayMode="image" card={captain} width="25%" />
          <VStack alignItems='flex-start'>
            <Text fontSize='2xl'>{captain.name}</Text>
            <Text>{splash.reduce((m, s) => m + s.quantity, 0)}/6 splashes from {splashFactions}</Text>
            <Text>{hold.reduce((memo: number, slot: DeckSlot) => memo + slot.quantity, 0)} cards</Text>
          </VStack>
          <Wrap direction='column'>
            {emplacements.map(e => <Slot key={e.card.id} slot={e} />)}
          </Wrap>
        </HStack>
        <Wrap direction='column'>
          {Object.keys(holdMap).map(t => <Box key={`hold-${t}`}>
            <Text>{t}</Text>
            {holdMap[t].map(s => <Slot slot={s} key={`${s.quantity}x${s.card.id}`} />)}
          </Box>)}
        </Wrap>
      </VStack>
    </PageWrapper>
  )
}