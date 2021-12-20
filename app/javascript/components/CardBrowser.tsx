import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { Container, ChakraProvider, Grid } from '@chakra-ui/react'

type CardBrowserProps = {
  cards: Card[]
}

export default ({ cards }: CardBrowserProps) => (
  <PageWrapper>
    <Container maxW='container.lg'>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {cards.map((c) =>
          <Card
            card={c}
          />)
        }
      </Grid>

    </Container>
  </PageWrapper>
)