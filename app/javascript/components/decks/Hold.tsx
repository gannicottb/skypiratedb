import { Box, SimpleGrid, Flex, Text, BoxProps } from "@chakra-ui/react";
import * as React from "react";
import { Slot } from "./Slot";

interface HoldProps extends BoxProps {
  deckbox: Deckbox,
}
export const Hold = ({ deckbox, ...props }: HoldProps) => (
  <Box {...props}>
    <Flex direction='column' flexWrap='wrap' height={['auto', 'md']} width='lg'>
      {Object.entries(deckbox.holdMap).map(([type, slots]) =>
        <Box marginBlockEnd={4} key={`hold-${type}`}>
          <Text fontSize='sm' fontWeight='bold' color='gray.500'>{type} ({slots.reduce((sum, s) => sum + s.quantity, 0)})</Text>
          {slots.map(s => <Slot deckSlot={s} showQuantity={true} key={s.card.id} />)}
        </Box>
      )}
    </Flex>
  </Box>
)