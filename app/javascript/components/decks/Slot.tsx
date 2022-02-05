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

interface SlotProps extends BoxProps {
  deckSlot: DeckSlot
  showQuantity: boolean
}
export const Slot = ({ deckSlot, showQuantity, ...props }: SlotProps) => (
  <Box {...props}>
    <Popover isLazy trigger='hover' placement='auto'>
      {showQuantity && <span>{deckSlot.quantity}x </span>}
      <PopoverTrigger>
        <Link href={`/cards/${deckSlot.card.id}`}>{deckSlot.card.name}</Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody><Card card={deckSlot.card} displayMode="text"></Card></PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>
)
