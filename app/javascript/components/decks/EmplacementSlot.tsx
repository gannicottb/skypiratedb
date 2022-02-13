import { Box, Center, HStack, Avatar, Image, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { GenericSlot } from "./GenericSlot";
import { Slot } from "./Slot";

export const EmplacementSlot = ({ slot, ...props }) => {
  const bg = useColorModeValue('whiteAlpha.600', 'blackAlpha.500')
  return (
    <Box
      borderWidth={2}
      borderColor='gray'
      borderRadius={4}
      padding={2}
      backgroundImage={slot.card.image_url}
      backgroundSize='cover'
      backgroundPosition={slot.card.subtype == 'Structure' ? 'bottom' : 'top'}
      {...props}>

      <Center background={bg} borderRadius={4}>
        <Slot deckSlot={slot} showQuantity={false} />
      </Center>
    </Box>
  )
}