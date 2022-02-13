import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  BoxProps,
  chakra,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from "@fortawesome/free-solid-svg-icons"
import * as React from "react"
import { Card } from "../Card"

interface GenericSlotProps extends BoxProps {
  deckSlot: DeckSlot
  splashFactions: string[]
}

// prints quantity + supplied link, splash icons and popover
export const GenericSlot = ({ deckSlot, splashFactions, ...props }: GenericSlotProps) => {

  const splashFaction = splashFactions.includes(deckSlot.card.faction) ?
    deckSlot.card.faction :
    undefined

  const splashIcon = <chakra.span paddingLeft={2} color={`${splashFaction?.toLowerCase()}.500`} >
    {Array.from(Array(deckSlot.quantity).keys()).map(i => <FontAwesomeIcon key={i} icon={faTint} />)}
  </chakra.span>

  return (
    <Box {...props}>
      <Popover isLazy trigger='hover' placement='auto'>
        <span>{deckSlot.quantity}x </span>
        <PopoverTrigger>
          {React.Children.only(props.children)}
        </PopoverTrigger>{splashFaction && splashIcon}
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Card card={deckSlot.card} displayMode="text"></Card>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
