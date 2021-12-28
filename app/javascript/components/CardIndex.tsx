import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { PaginationBar } from './PaginationBar'
import { stringInclude, stringExactMatch, numericEqual, useFilter } from '../hooks/useFilter'
import { Box, HStack, RadioGroup, SimpleGrid, Text, Stack, Radio, Divider, Select, Input, Spacer, InputGroup, InputRightAddon, chakra, Center, Tooltip, InputLeftAddon } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import QuerySyntaxHelp from './QuerySyntaxHelp'

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
  const keyMap = {
    "x": { fn: stringInclude, arg: "text" },
    "t": { fn: stringExactMatch, arg: "type" },
    "s": { fn: stringExactMatch, arg: "subtype" },
    "f": { fn: stringExactMatch, arg: "faction" },
    "a": { fn: numericEqual, arg: "attack" },
    "d": { fn: numericEqual, arg: "defense" },
    "dur": { fn: numericEqual, arg: "durability" },
    "c": { fn: numericEqual, arg: "cost" },
    "p": { fn: numericEqual, arg: "power" },
    "art": { fn: stringInclude, arg: "artist" }
  }
  const [parseQuery, helpText] = useFilter(keyMap)
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
    ),
    "type": (card1: Card, card2: Card) => (
      card1.type.localeCompare(card2.type)
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
  const perPageOptions = [10, 20, 30, 40, 50]

  const [currentPage, setCurrentPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(perPageOptions[3])

  // Apply filter, sort, and then pagination to full list of cards
  const transformedCards = cards
    .filter(parseQuery(query))
    .sort(currentSortFn(sorter))
  const paginatedCards = transformedCards
    .slice(
      perPage * (currentPage - 1),
      (perPage * currentPage)
    )

  const SearchBar = ({ setQuery, helpText }) => {
    const [raw, setRaw] = React.useState(query)

    return (
      <chakra.form size='md'>
        <InputGroup>
          <InputLeftAddon>
            <QuerySyntaxHelp
              keywordHelp={Object.keys(keyMap).map(k => ({ kw: k, desc: keyMap[k].arg }))}
            />
          </InputLeftAddon>
          <Input
            placeholder='Enter a query here. ex: t:crew'
            value={raw}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                setCurrentPage(1);
                setQuery(raw);
              }
            }
            }
            onChange={(ev) => setRaw(ev.target.value)} />
        </InputGroup>
      </chakra.form>
    )
  }

  const PageSizePicker = ({ perPageOptions, perPage, setPerPage }) => {
    return (
      <HStack>
        <Text>Showing</Text>
        <Select
          width='fit-content'
          value={perPage}
          onChange={(ev) => setPerPage(ev.target.value)}>
          {perPageOptions.map(i => <option key={i} value={i}>{i}</option>)}
        </Select>
        <Text>per page</Text>
      </HStack>
    )
  }

  const Controls = () => (
    <HStack paddingBlock={4}>
      <Select
        width='fit-content'
        value={displayMode}
        onChange={(ev) => setDisplayMode(ev.currentTarget.value)}
      >
        <option value="image">Images</option>
        <option value="text">Text Only</option>
      </Select>
      <HStack>
        <Text>sorted by</Text>
        <Select
          width='fit-content'
          value={sorter.field}
          onChange={(v) => setSorter({ direction: sorter.direction, field: v.currentTarget.value })}>
          {Object.keys(sortFns).map(f => <option key={f} value={f}>{f}</option>)}
        </Select>
        <Text>:</Text>
        <Select
          width='80px'
          value={sorter.direction}
          onChange={(v) => setSorter({ direction: v.currentTarget.value, field: sorter.field })}>
          <option value='asc'>Asc</option>
          <option value='desc'>Desc</option>
        </Select>
      </HStack>
      <Spacer />
      <PaginationBar
        totalItems={transformedCards.length}
        pageSize={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </HStack>
  )
  let startIdx = perPage * (currentPage - 1)
  let endIdx = perPage * currentPage // end is not inclusive
  return (
    <PageWrapper>
      <SearchBar setQuery={setQuery} helpText={helpText} />
      <Divider />
      <Controls />
      <Text as='em'>{startIdx + 1} - {Math.min(endIdx, transformedCards.length)} of {transformedCards.length} cards that match the query "{query}".</Text>
      <SimpleGrid minChildWidth='200px' spacing='3'>
        {paginatedCards.length > 0 ?
          paginatedCards
            .map((c) =>
              <Card
                displayMode={displayMode}
                card={c}
                key={c.id}
              />) :
          <Box><Text>No cards match!</Text></Box>}
      </SimpleGrid>
      <Controls />
    </PageWrapper>
  )
}