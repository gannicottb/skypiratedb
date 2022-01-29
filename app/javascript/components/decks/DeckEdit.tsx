import { Input, Text, Stack, VStack } from "@chakra-ui/react"
import * as React from "react"
import PageWrapper from "../PageWrapper"


const Controls = () => (
  <VStack>
    <Text>Deck name</Text>
    <Text>Save deck</Text>
    <Text>Delete deck</Text>
  </VStack>
)

const Editor = () => (
  <VStack>
    <Text>Add some cards!</Text>
  </VStack>
)

const Browser = () => (
  <VStack>
    <Input></Input>
    <Text>card results</Text>
  </VStack>
)

export default ({ deck, current_user }) => {


  return (
    <PageWrapper current_user={current_user}>
      <Stack direction={['column', 'row']}>
        <Controls />
        <Editor />
        <Browser />
      </Stack>
    </PageWrapper>
  )
}