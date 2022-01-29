import { Box, Heading, Link, Text } from "@chakra-ui/react"
import * as React from "react"
import PageWrapper from "../PageWrapper"
import DeckListItem from "./DeckListItem"

export default ({ decks, current_user }) => {

  return (
    <PageWrapper current_user={current_user}>
      <Box>
        {decks.map(deck =>
          <DeckListItem deck={deck} />
        )}
      </Box>
    </PageWrapper>
  )
}