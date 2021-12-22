import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { Box, HStack, RadioGroup, SimpleGrid, Grid, Text, Stack, Radio, Divider, EditableInput, Editable, Select } from '@chakra-ui/react'

type CardIndexProps = {
  cards: Card[]
}
export default ({ cards }: CardIndexProps) => {
  /*
  // DISPLAY MODE
  */
  const [displayMode, setDisplayMode] = React.useState('image')

  /*
  // FILTER
  */
  const parseQuery = (queryString: string) => {
    const keyMap = {
      "x": (c: Card, input: string) => (c.text || "").toLowerCase().includes(input.toLowerCase()),
      "t": (c: Card, input: string) => c.type.toLowerCase() === input.toLowerCase(),
      "f": (c: Card, input: string) => c.faction.toLowerCase() === input.toLowerCase(),
      "s": (c: Card, input: string) => (c.subtype || "").toLowerCase() === input.toLowerCase()
    }

    // raw string can contain multiple expressions, delimited by a string
    const expressions = queryString.split(" ").filter(s => s.length > 0)

    // Build a composite boolean function to match all conditions in query string
    return expressions.map(e => {
      const [key, input] = e.split(":").map(s => s.trim())
      return (card: Card) => (
        keyMap[key](card, input)
      )
    }).reduce(
      (memo, fn) => (card: Card) => memo(card) && fn(card), // AND all conditions
      (_card: Card) => true // By default, let everything through
    )
  }
  const [query, setQuery] = React.useState("x:special f:imperial")

  /*
  // SORT
  */
  const sortFns = {
    "name": (card1: Card, card2: Card) => (
      card1.name.localeCompare(card2.name)
    ),
    "faction": (card1: Card, card2: Card) => (
      card1.faction.localeCompare(card2.faction)
    )
    // TODO: generalize to "string" and "number" I think
    // that would require matching on types probs
  }
  // get the compare function from sortFns then apply asc/desc
  const currentSortFn = ({ field, direction }) => (
    // TODO: any equivalent of andThen or map for TS functions? pls?
    (c1: Card, c2: Card) => sortFns[field](c1, c2) * (direction === "asc" ? 1 : -1)
  )
  const [sorter, setSorter] = React.useState({ field: "name", direction: "asc" })

  /*
  // PAGINATION
  */
  // Mocked out - make controllable
  const maxPerPage = 20
  const currentPage = 1
  const start = maxPerPage * (currentPage - 1)
  const end = (maxPerPage * currentPage)

  // Apply filter, sort, and then pagination to full list of cards
  const transformedCards = cards
    .filter(parseQuery(query))
    .sort(currentSortFn(sorter))
    .slice(start, end)

  return (
    <PageWrapper>
      <Box>
        <Editable>
          <EditableInput
            value={query}
            onChange={() => setQuery}
          ></EditableInput>
        </Editable>
      </Box>
      <RadioGroup onChange={setDisplayMode} value={displayMode} paddingBlock={4}>
        <Stack direction='row'>
          <Radio value='image'>Images</Radio>
          <Radio value='text'>Text</Radio>
        </Stack>
      </RadioGroup>
      {/* TODO: look up that thing about React spread objects not showing as new */}
      {/* TODO: also this should be a Select probably*/}
      <RadioGroup onChange={(v) => setSorter({ direction: v, ...sorter })} value={sorter.direction}>
        <HStack>
          <Radio value='asc'>Sort Asc</Radio>
          <Radio value='desc'>Sort Desc</Radio>
        </HStack>
      </RadioGroup>
      <SimpleGrid minChildWidth='300px' spacing='20px'>
        {transformedCards.length > 0 ?
          transformedCards.map((c) =>
            <Card
              displayMode={displayMode}
              card={c}
              key={c.id}
            />) :
          <Box><Text>No cards match!</Text></Box>}
      </SimpleGrid>
    </PageWrapper>
  )
}