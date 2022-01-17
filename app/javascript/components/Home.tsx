import * as React from 'react'
import { Text, Heading, Button, VStack, Stack, Spacer } from '@chakra-ui/react'
import PageWrapper from './PageWrapper'
import { Card } from './Card'

export default ({ card, current_user }) => (
  <PageWrapper current_user={current_user}>
    <VStack>
      <Heading size='3xl'>SkyPirateDB</Heading>
      <Stack direction={['column-reverse', 'row']} width='100%'>
        <VStack>
          <Heading>Random Card</Heading>
          <Card displayMode='image' card={card} />
        </VStack>
        <Spacer />
        <VStack>
          <Spacer />
          <Text>The official card database for the Sky Pirate card game.</Text>
          <Button as='a' href='/cards' colorScheme='yellow'>Browse the cards</Button>
          <Spacer />
        </VStack>
      </Stack>
    </VStack>
  </PageWrapper>
)