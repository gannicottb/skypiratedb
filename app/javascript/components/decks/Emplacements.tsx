import { Box, SimpleGrid } from "@chakra-ui/react"
import * as React from "react"
import { EmplacementSlot } from "./EmplacementSlot"

interface EmplacementsProps {
  deckbox: Deckbox,
  emplacementItem?: (DeckSlot) => any
}
export const Emplacements = ({ deckbox, emplacementItem, ...props }: EmplacementsProps) => {
  const structures = deckbox.emplacements.filter(e => e.card.subtype == "Structure")
  const cannons = deckbox.emplacements.filter(e => e.card.subtype == "Cannon")

  //default item
  emplacementItem = emplacementItem == undefined ?
    (s: DeckSlot) => <EmplacementSlot key={s.id} slot={s} /> :
    emplacementItem

  const EmplacementRow = ({ slots, ...props }) => (
    <SimpleGrid columns={[1, 4]} spacing={2} {...props}>
      {slots.map(emplacementItem)}
    </SimpleGrid>
  )

  return (
    <Box {...props}>
      <EmplacementRow slots={structures} />
      <EmplacementRow slots={cannons} marginTop={2} />
    </Box>
  )
}