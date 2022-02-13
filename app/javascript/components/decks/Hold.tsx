import { Box, SimpleGrid, Flex, Text, BoxProps, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { Slot } from "./Slot";

interface HoldProps extends BoxProps {
  deckbox: Deckbox,
  holdItem?: (DeckSlot) => any
}
export const Hold = ({ deckbox, holdItem, ...props }: HoldProps) => {
  // default slot
  holdItem = holdItem == undefined ?
    (d: DeckSlot) => <Slot key={d.id} deckSlot={d} showQuantity={true} splashFactions={deckbox.splashFactions} /> :
    holdItem

  return (
    <Box {...props}>
      <Flex direction='column' flexWrap='wrap' maxH={['auto', 'sm']} width='lg'>
        {Object.entries(deckbox.holdMap).map(([type, slots]) =>
          <Box marginBlockEnd={4} key={`hold-${type}`}>
            <Text fontSize='sm' fontWeight='bold' color='gray.500'>{type} ({slots.reduce((sum, s) => sum + s.quantity, 0)})</Text>
            {slots.map(holdItem)}
          </Box>
        )}
      </Flex>
    </Box>
  )
}