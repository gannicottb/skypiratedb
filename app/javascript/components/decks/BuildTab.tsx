import { Text, Input, Image, ButtonGroup, Button, Divider, Box, chakra, List, ListItem, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import * as React from "react"

import { stringInclude, useFilter } from '../../hooks/useFilter'
import { FactionIcon } from '../FactionIcon'


export const BuildTab = ({ cards, handleSetSlot }) => {
  // typeahead results specifically
  const [results, setResults] = React.useState<Card[]>([])
  const [query, setQuery] = React.useState("")
  const [cursor, setCursor] = React.useState(0)

  // cards listed in the main tray
  const [selectedFactions, setSelectedFactions] = React.useState({
    "Pirate": false,
    "Imperial": false,
    "Trader": false,
    "Ghost": false,
    "Devoted": false,
    "Neutral": false
  })
  const handleSelectFaction = (faction) => {
    const updated = { ...selectedFactions }
    updated[faction] = !updated[faction]
    setSelectedFactions(updated)
  }
  const [selectedTypes, setSelectedTypes] = React.useState({
    "Captain": false,
    "Structure": false,
    "Cannon": false,
    "Asset": false,
    "Crew": false,
    "Maneuver": false,
    "Special Ammo": false
  })
  const handleSelectType = (type) => {
    const updated = { ...selectedTypes }
    updated[type] = !updated[type]
    setSelectedTypes(updated)
  }

  // TYPEAHEAD
  const parseQuery = useFilter()

  const doSearch = (q) => {
    const results = cards.filter(c => stringInclude("name")(c, q))
    setResults(results)
    setCursor(0)
  }

  const handleInput = (e) => {
    const { value } = e.target
    setQuery(value)
    if (value.length >= 3) {
      doSearch(value)
    } else {
      setResults([])
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < results.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      handleSetSlot({ quantity: 1, card: results[cursor] })
      setQuery("")
      setResults([])
    } else if (e.keyCode == 27) {
      setResults([])
    }
  }
  //

  const filtered = cards.filter(c => {
    console.log(parseQuery(query))
    return selectedFactions[c.faction] &&
      (selectedTypes[c.type] || selectedTypes[c.subtype]) &&
      parseQuery(query)
  }
  )

  return <Box>
    <chakra.div
      position='relative'
    >
      <Input
        placeholder='Find a card'
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        value={query}
        autoFocus
      ></Input>
      <Box
        position='absolute'
        zIndex='1'
        boxShadow='md'
        bg='tomato'
        borderRadius='lg'
        width='100%'
      >
        {results.map((card, index) => (
          <Text
            key={card.id}
            padding='md'
            fontWeight={index === cursor ? 'extrabold' : 'normal'}
          >{card.name}</Text>
        ))}
      </Box>
    </chakra.div>
    <ButtonGroup isAttached variant='outline' size='sm'>
      {Object.keys(selectedFactions).map(t =>
        <Button key={t}
          onClick={() => handleSelectFaction(t)}
          variant={selectedFactions[t] ? 'solid' : 'outline'}><FactionIcon faction={t} /></Button>
      )}
    </ButtonGroup>
    <Divider />
    <ButtonGroup isAttached variant='outline' size='sm'>
      {Object.keys(selectedTypes).map(t =>
        <Button key={t}
          onClick={() => handleSelectType(t)}
          variant={selectedTypes[t] ? 'solid' : 'outline'}>{t.slice(0, 4)}</Button>
      )}
    </ButtonGroup>
    <Table variant='striped' colorScheme='gray'>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>T.</Th>
          <Th>F.</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filtered.map(c =>
          <Tr>
            <Td>{c.name}</Td>
            <Td>{c.type.slice(0, 4)}</Td>
            <Td><FactionIcon faction={c.faction} /></Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </Box>
}