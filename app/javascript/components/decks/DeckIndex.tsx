import { Box, Heading, Text } from "@chakra-ui/react"
import * as React from "react"
import PageWrapper from "../PageWrapper"

export default ({ decks, current_user }) => {

  return (
    <PageWrapper current_user={current_user}>
      <Box>
        {decks.map(d =>
          <Box key={d.id}>
            <Heading>{d.id}</Heading>
            {d.description}
            {d.slots.map(s =>
              <Text key={d.id + s.card.id}>{s.quantity}x {s.card.name}</Text>
            )}
          </Box>)}
      </Box>
    </PageWrapper>
  )
}