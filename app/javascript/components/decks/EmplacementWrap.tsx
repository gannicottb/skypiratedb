import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const EmplacementWrap = ({ deckSlot, children, ...props }) => (
  <Box
    borderWidth={2}
    borderColor='gray'
    borderRadius={4}
    padding={2}
    backgroundImage={deckSlot.card.image_url}
    backgroundSize='cover'
    backgroundPosition={deckSlot.card.subtype == 'Structure' ? 'bottom' : 'top'}
    {...props}>
    <Center
      background={useColorModeValue('whiteAlpha.600', 'blackAlpha.500')}
      borderRadius={4}>
      {React.Children.only(children)}
    </Center>
  </Box>
)