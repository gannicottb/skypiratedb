import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { Box, HStack, RadioGroup, SimpleGrid, Text, Stack, Radio, Divider, Select, Input, Spacer, InputGroup, InputRightAddon, chakra, Button, IconButton, Center } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ setQuery }) => {
  const [raw, setRaw] = React.useState("")

  // TODO: add a syntax helper somewhere
  return (
    <chakra.form size='md'>
      <InputGroup>
        <Input
          placeholder='Enter a query here. ex: t:crew'
          value={raw}
          onChange={(ev) => setRaw(ev.target.value)} />
        <InputRightAddon as='button'
          type='submit'
          onClick={(ev) => { ev.preventDefault(); setQuery(raw) }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </InputRightAddon>
      </InputGroup>
    </chakra.form>
  )
}

const PaginationBar = ({ perPageOptions, state, dispatch }) => (
  <HStack>
    <IconButton
      aria-label="First"
      icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
      onClick={() => dispatch({ type: "first" })}
    >First</IconButton>
    <IconButton
      aria-label="Previous"
      icon={<FontAwesomeIcon icon={faAngleLeft} />}
      disabled={state.currentPage === 1}
      onClick={() => dispatch({ type: "previous" })}
    >Previous ({state.currentPage - 1})</IconButton>
    <Text>{state.currentPage}</Text>
    <IconButton
      aria-label="Next"
      icon={<FontAwesomeIcon icon={faAngleRight} />}
      disabled={state.currentPage === state.numPages}
      onClick={() => dispatch({ type: "next" })}
    >Next ({state.currentPage + 1})</IconButton>
    <IconButton
      aria-label="Last"
      icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
      onClick={() => dispatch({ type: "last" })}
    >Last ({state.numPages})</IconButton>

    <Text>Showing</Text>
    <Select
      width='fit-content'
      value={state.perPage}
      onChange={(ev) => dispatch({ type: "setPerPage", payload: ev.target.value })}>
      {perPageOptions.map(i => <option key={i} value={i}>{i}</option>)}
    </Select>
    <Text>per page</Text>
  </HStack >
)

type CardIndexProps = {
  cards: Card[]
}
export default ({ cards }: CardIndexProps) => {
  /*
  // DISPLAY MODE
  */
  const [displayMode, setDisplayMode] = React.useState('text')

  /*
  // FILTER
  */
  const parseQuery = (queryString: string) => {
    const stringExactMatch = (fieldName: string) => (
      (c: Card, input: string) => (c[fieldName] || "").toLowerCase() === input.toLowerCase()
    )
    const stringInclude = (fieldName: string) => (
      (c: Card, input: string) => (c[fieldName] || "").toLowerCase().includes(input.toLowerCase())
    )

    const numericEqual = (fieldName: string) => {
      return (c: Card, input: string) => {
        if (c[fieldName]) {
          return Number(c[fieldName]) === Number(input)
        } else {
          return false
        }
      }
    }

    const keyMap = {
      "x": stringInclude("text"),
      "t": stringExactMatch("type"),
      "f": stringExactMatch("faction"),
      "s": stringExactMatch("subtype"),
      "a": numericEqual("attack"),
      "d": numericEqual("defense"),
      "dur": numericEqual("durability"),
      "c": numericEqual("cost"),
      "p": numericEqual("power"),
      "art": stringInclude("artist")
    }

    // make case insensitive, and default to string include on `name`
    const filterMap = (filterKey: string) => keyMap[filterKey.toLowerCase()] || stringInclude("name")

    // raw string can contain multiple expressions, delimited by a space
    const expressions = queryString.split(" ").filter(s => s.length > 0)

    // Build a composite boolean function to match all conditions in query string
    return expressions.map(e => {
      const [key, input] = e.split(":").map(s => s.trim())

      return (card: Card) => (
        filterMap(key)(card, input || key)
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
  type PaginationState = {
    perPage: number;
    currentPage: number;
    numPages: number;
  }
  const perPageOptions = [10, 20, 50]
  const defaultPerPage = perPageOptions[1]
  const initialState = { perPage: defaultPerPage, currentPage: 1, numPages: Math.ceil(cards.length / defaultPerPage) }
  const reducer = (state: PaginationState, action) => {
    switch (action.type) {
      case 'next':
        return {
          ...state,
          currentPage: state.currentPage < state.numPages ? state.currentPage + 1 : state.currentPage
        }
      case 'previous':
        return {
          ...state,
          currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage
        }
      case 'first':
        return {
          ...state,
          currentPage: 1
        };
      case 'last':
        return {
          ...state,
          currentPage: state.numPages
        };
      case 'setPerPage':
        const newPerPage = Number(action.payload)
        return {
          ...state,
          currentPage: 1, // hack
          perPage: newPerPage,
          numPages: Math.ceil(cards.length / newPerPage)
        }
      default:
        console.log(`Pagination received unknown action ${action}.`)
        return state
    }
  }

  const [pagination, updatePagination] = React.useReducer(reducer, initialState)

  // Apply filter, sort, and then pagination to full list of cards
  const transformedCards = cards
    .filter(parseQuery(query))
    .sort(currentSortFn(sorter))
    .slice(
      pagination.perPage * (pagination.currentPage - 1),
      (pagination.perPage * pagination.currentPage)
    )

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
        <HStack>
          <Text>Sort by</Text>
          <Select
            width='fit-content'
            onChange={(v) => setSorter({ direction: sorter.direction, field: v.currentTarget.value })}>
            {Object.keys(sortFns).map(f => <option key={f} value={f}>{f}</option>)}
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
      <Center>
        <PaginationBar
          perPageOptions={perPageOptions}
          state={pagination}
          dispatch={updatePagination} />
      </Center>
    </PageWrapper >
  )
}