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
} from '@chakra-ui/react'
import * as React from "react"
import { Card } from "../Card"

export const Slot = ({ slot, showQuantity, ...props }) => (
  <Box {...props}>
    <Popover isLazy trigger='hover' placement='auto'>
      {showQuantity && <span>{slot.quantity}x </span>}
      <PopoverTrigger>
        <Link href={`/cards/${slot.card.id}`}>{slot.card.name}</Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody><Card card={slot.card} displayMode="text"></Card></PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>
)
