import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { HStack } from '@chakra-ui/react'

type CardShowProps = {
  card: Card,
  current_user: User
}

export default ({ card, current_user }: CardShowProps) => {

  return (
    <PageWrapper current_user={current_user}>
      <HStack align='start'>
        <Card displayMode='image' card={card} />
        <Card displayMode='text' card={card} />
      </HStack>
    </PageWrapper>
  )
}