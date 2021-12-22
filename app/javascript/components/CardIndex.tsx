import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { IconButton, Box, HStack, RadioGroup, SimpleGrid, Grid, Text, Stack, Radio, Divider, EditableInput, Editable, Select, SelectField, Input, Spacer, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// TODO: neaten up the interaction a bit perhaps
// maybe a form would be more appropriate.
const SearchBar = ({ setQuery }) => {
  const [raw, setRaw] = React.useState("")
  return (
    <InputGroup size='md'>
      <Input
        placeholder='Enter a query here. ex: t:crew'
        value={raw}
        onChange={(ev) => setRaw(ev.target.value)} />
      <InputRightAddon as='button'
        onClick={() => setQuery(raw)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </InputRightAddon>
    </InputGroup>
  )
}


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
  const [query, setQuery] = React.useState("")

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
  // const maxPerPage = 20
  // const currentPage = 1


  // TODO: useReducer probably more appropriate here
  const [pagination, updatePagination] = React.useState({ perPage: 20, currentPage: 1, numPages: Math.round(cards.length / 20) })
  const start = pagination.perPage * (pagination.currentPage - 1)
  const end = (pagination.perPage * pagination.currentPage)

  // Apply filter, sort, and then pagination to full list of cards
  const transformedCards = cards
    .filter(parseQuery(query))
    .sort(currentSortFn(sorter))
    .slice(start, end)

  return (
    <PageWrapper>
      <SearchBar setQuery={setQuery} />
      <Divider />
      <HStack>
        <RadioGroup onChange={setDisplayMode} value={displayMode} paddingBlock={4}>
          <Stack direction='row'>
            <Radio value='image'>Images</Radio>
            <Radio value='text'>Text</Radio>
          </Stack>
        </RadioGroup>
        <Spacer />
        {/* TODO: look up that thing about React spread objects not showing as new */}
        <HStack>
          <Text>Sort by</Text>
          <Select
            width='fit-content'
            onChange={(v) => setSorter({ direction: sorter.direction, field: v.currentTarget.value })}>
            {Object.keys(sortFns).map(f => <option value={f}>{f}</option>)}
          </Select>
          <Select
            width='80px'
            onChange={(v) => setSorter({ direction: v.currentTarget.value, field: sorter.field })}>
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
          </Select>
        </HStack>

      </HStack>
      <SimpleGrid minChildWidth='200px' spacing='20px'>
        {transformedCards.length > 0 ?
          transformedCards.map((c) =>
            <Card
              displayMode={displayMode}
              card={c}
              key={c.id}
            />) :
          <Box><Text>No cards match!</Text></Box>}
      </SimpleGrid>
    </PageWrapper >
  )
}