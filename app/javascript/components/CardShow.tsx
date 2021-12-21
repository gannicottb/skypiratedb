import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { HStack } from '@chakra-ui/react'

type CardShowProps = {
  card: Card
}

export default ({ card }: CardShowProps) => {

  return (
    <PageWrapper>
      <HStack align='start'>
        <Card displayMode='image' card={card} />
        <Card displayMode='text' card={card} />
      </HStack>

    </PageWrapper>
  )
}