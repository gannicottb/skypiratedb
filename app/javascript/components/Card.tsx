import * as React from 'react'
import { Box, Image } from '@chakra-ui/react'

type CardProps = {
  card: Card
}
export const Card = ({ card }: CardProps) => (
  <Box maxW='200px'>
    <Image src={card.image_url} alt={card.name} />
    {card.back && (
      <Image src={card.back.image_url} />
    )
    }
  </Box>
)