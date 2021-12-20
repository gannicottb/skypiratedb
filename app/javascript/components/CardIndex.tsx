import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { RadioGroup, SimpleGrid, Grid, Stack, Radio } from '@chakra-ui/react'

type CardIndexProps = {
  cards: Card[]
}

export default ({ cards }: CardIndexProps) => {
  const [value, setValue] = React.useState('image')

  return (
    <PageWrapper>
      <RadioGroup onChange={setValue} value={value} paddingBlock={4}>
        <Stack direction='row'>
          <Radio value='image'>Images</Radio>
          <Radio value='text'>Text</Radio>
        </Stack>
      </RadioGroup>
      <SimpleGrid minChildWidth='20%' spacing='20px'>
        {cards.map((c) =>
          <Card
            displayMode={value}
            card={c}
          />)
        }
      </SimpleGrid>
    </PageWrapper>
  )
}