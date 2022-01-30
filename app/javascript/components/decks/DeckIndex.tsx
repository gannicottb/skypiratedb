import { Divider, VStack } from "@chakra-ui/react"
import * as React from "react"
import PageWrapper from "../PageWrapper"
import DeckListItem from "./DeckListItem"

export default ({ decks, current_user }) => {

  return (
    <PageWrapper current_user={current_user}>
      <VStack spacing={4} alignItems='flex-start' width='100%'>
        {decks.map(deck => <>
          <DeckListItem deck={deck} />
          <Divider />
        </>
        )}
      </VStack>
    </PageWrapper>
  )
}