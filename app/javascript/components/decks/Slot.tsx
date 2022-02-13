import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  BoxProps,
} from '@chakra-ui/react'
import * as React from "react"
import { Card } from "../Card"
import { GenericSlot } from './GenericSlot'

interface SlotProps extends BoxProps {
  deckSlot: DeckSlot
  showQuantity: boolean
  splashFactions?: string[]
}
// GenericSlot containing a Link to the card
export const Slot = ({ deckSlot, showQuantity, splashFactions, ...props }: SlotProps) => (
  <GenericSlot
    deckSlot={deckSlot}
    splashFactions={splashFactions}
  >
    <Link href={`/cards/${deckSlot.card.id}`}>{deckSlot.card.name}</Link>
  </GenericSlot>
)
