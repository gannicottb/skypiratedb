import { Box, SimpleGrid } from "@chakra-ui/react"
import * as React from "react"
import { EmplacementWrap } from "./EmplacementWrap"
import { Slot } from "./Slot"

interface EmplacementsProps {
  deckbox: Deckbox,
  emplacementItem?: (DeckSlot) => any
}
export const Emplacements = ({ deckbox, emplacementItem, ...props }: EmplacementsProps) => {
  const structures = deckbox.emplacements.filter(e => e.card.subtype == "Structure")
  const cannons = deckbox.emplacements.filter(e => e.card.subtype == "Cannon")

  //default item
  emplacementItem = emplacementItem == undefined ?
    (s: DeckSlot) => <Slot deckSlot={s} showQuantity={false} splashFactions={deckbox.splashFactions} key={s.id} /> :
    emplacementItem

  const EmplacementRow = ({ slots, ...props }) => (
    <SimpleGrid columns={[1, 4]} spacing={2} {...props}>
      {slots.map(s =>
        <EmplacementWrap deckSlot={s} key={s.card.id}>
          {emplacementItem(s)}
        </EmplacementWrap>
      )}
    </SimpleGrid>
  )

  return (
    <Box {...props}>
      <EmplacementRow slots={structures} />
      <EmplacementRow slots={cannons} marginTop={2} />
    </Box>
  )
}