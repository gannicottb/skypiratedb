import * as React from 'react'
import { Card } from './Card'
import { Container, ChakraProvider, Grid } from '@chakra-ui/react'

type CardBrowserProps = {
  cards: Card[]
}

export default ({ cards }: CardBrowserProps) => (
  <ChakraProvider>
    <Container maxW='container.lg'>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {cards.map((c) =>
          <Card
            card={c}
          />)
        }
      </Grid>

    </Container>
  </ChakraProvider>
)