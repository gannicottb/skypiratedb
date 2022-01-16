import * as React from 'react'
import { Card } from './Card'
import PageWrapper from './PageWrapper'
import { PaginationBar } from './PaginationBar'
import { stringInclude, stringExactMatch, numericEqual, useFilter } from '../hooks/useFilter'
import {
  Box,
  chakra,
  HStack,
  Input,
  InputGroup,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import QuerySyntaxHelp from './QuerySyntaxHelp'

type CardIndexProps = {
  cards: Card[],
  current_user: any
}
export default ({ cards, current_user }: CardIndexProps) => {
  /*
  // DISPLAY MODE
  */
  const [displayMode,
    setDisplayMode] = React.useState('image')

  /*
  // FILTER
  */
  const keyMap = {
    "x": { fn: stringInclude, arg: "raw_text" },
    "t": { fn: stringExactMatch, arg: "type" },
    "sup": { fn: stringExactMatch, arg: "supertype" },
    "s": { fn: stringExactMatch, arg: "subtype" },
    "f": { fn: stringExactMatch, arg: "faction" },
    "a": { fn: numericEqual, arg: "attack" },
    "d": { fn: numericEqual, arg: "defense" },
    "dur": { fn: numericEqual, arg: "durability" },
    "c": { fn: numericEqual, arg: "cost" },
    "p": { fn: numericEqual, arg: "power" },
    "art": { fn: stringInclude, arg: "artist" },
    "e": { fn: stringInclude, arg: "expansion" }
  }
  const parseQuery = useFilter(keyMap)
  const [query, setQuery] = React.useState("")

  /*
  // SORT
  */
  const byString = (stringPropName: string) => (
    (a: Card, b: Card) => a[stringPropName]?.localeCompare(b[stringPropName]) ?? 0
  )
  const byNumber = (numberPropName: string) => (
    (a: Card, b: Card) => (a[numberPropName] || 0) - (b[numberPropName] || 0)
  )
  const sortFns = {
    "name": byString("name"),
    "faction": byString("faction"),
    "type": byString("type"),
    "attack": byNumber("attack"),
    "defense": byNumber("defense"),
    "durability": byNumber("durability"),
    "cost": byNumber("cost"),
    "power": byNumber("power")
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
  const [currentPage, setCurrentPage] = React.useState(1)
  const perPage = 40

  // Apply filter, sort, and then pagination to full list of cards
  const transformedCards = cards
    .filter(parseQuery(query))
    .sort(currentSortFn(sorter))
  const paginatedCards = transformedCards
    .slice(
      perPage * (currentPage - 1),
      (perPage * currentPage)
    )

  const SearchBar = ({ setQuery }) => {
    const [raw, setRaw] = React.useState(query)

    return (
      <chakra.form size='md'>
        <InputGroup>
          <QuerySyntaxHelp
            keywordHelp={Object.keys(keyMap).map(k => ({ kw: k, desc: keyMap[k].arg }))}
          />
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

  const Controls = () => (
    <Stack direction={['column', 'row']} paddingBlock={4}>
      <Stack direction={['column', 'row']}>
        <Select
          width={['100%', 'fit-content']}
          value={displayMode}
          onChange={(ev) => setDisplayMode(ev.currentTarget.value)}
        >
          <option value="image">View as Images</option>
          <option value="text">View as Text Only</option>
        </Select>
        <HStack>
          <Select
            width={['100%', 'fit-content']}
            value={sorter.field}
            onChange={(v) => setSorter({ direction: sorter.direction, field: v.currentTarget.value })}>
            {Object.keys(sortFns).map(f => <option key={f} value={f}>Sort by {f}</option>)}
          </Select>
          <Text>:</Text>
          <Select
            width={['100%', 'fit-content']}
            value={sorter.direction}
            onChange={(v) => setSorter({ direction: v.currentTarget.value, field: sorter.field })}>
            <option value='asc'>Asc</option>
            <option value='desc'>Desc</option>
          </Select>
        </HStack>
      </Stack>
      <Spacer />
      <PaginationBar
        totalItems={transformedCards.length}
        pageSize={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Stack>
  )
  let startIdx = perPage * (currentPage - 1)
  let endIdx = perPage * currentPage // end is not inclusive
  return (
    <PageWrapper current_user={current_user} >
      <SearchBar setQuery={setQuery} />
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