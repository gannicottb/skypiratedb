import {
  Link,
  BoxProps,
  HStack,
} from '@chakra-ui/react'
import * as React from "react"
import { SplashPips } from './SplashPips'
import { WithPopover } from './WithPopover'

interface SlotProps extends BoxProps {
  deckSlot: DeckSlot
  showQuantity: boolean
  splashFactions?: string[]
}

// Popover + pips
export const Slot = ({ deckSlot, showQuantity, splashFactions, ...props }: SlotProps) => (
  <HStack spacing={1} {...props}>
    {showQuantity && <span>{deckSlot.quantity}x</span>}
    <WithPopover card={deckSlot.card}>
      <Link href={`/cards/${deckSlot.card.id}`}>{deckSlot.card.name}</Link>
    </WithPopover>
    {splashFactions.includes(deckSlot.card.faction) &&
      <SplashPips
        splashFactions={splashFactions}
        deckSlot={deckSlot}
      />}
  </HStack>
)
