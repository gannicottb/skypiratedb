import { Box, SimpleGrid } from "@chakra-ui/react"
import * as React from "react"
import { EmplacementSlot } from "./EmplacementSlot"

const EmplacementRow = ({ slots, ...props }) => (
  <SimpleGrid columns={[1, 4]} spacing={2} {...props}>
    {slots.map(e => <EmplacementSlot key={e.card.id} slot={e} />)}
  </SimpleGrid>
)

export const Emplacements = ({ emplacements, ...props }) => {
  const structures = emplacements.filter(e => e.card.subtype == "Structure")
  const cannons = emplacements.filter(e => e.card.subtype == "Cannon")

  return (
    <Box {...props}>
      <EmplacementRow slots={structures} />
      <EmplacementRow slots={cannons} marginTop={2} />
    </Box>
  )
}