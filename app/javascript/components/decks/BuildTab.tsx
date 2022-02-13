import { Text, Input, Image, ButtonGroup, Button, Divider, Box, chakra, Link, ListItem, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue, useDisclosure, Modal, HStack, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, Stack, Spacer } from "@chakra-ui/react"
import * as React from "react"

import { stringInclude, useFilter } from '../../hooks/useFilter'
import { Card } from "../Card"
import { FactionIcon } from '../FactionIcon'
import { WithModal } from "./WithModal"
import { WithPopover } from "./WithPopover"
import { sortBy } from 'lodash'
import { TypeIcon } from "../TypeIcon"

// Given a list of flags, maintain on/off for each.
const useToggleMap = (flags: string[]): [{}, (string) => void] => {
  const map = flags.reduce((prev, curr) => { prev[curr] = false; return prev }, {})
  const [toggles, setToggles] = React.useState(map)
  const toggleFlag = (flag) => {
    const updated = { ...toggles }
    updated[flag] = !updated[flag]
    setToggles(updated)
  }
  return [toggles, toggleFlag]
}

export const BuildTab = ({ deckbox, cards, handleSetSlot }) => {
  // typeahead results specifically
  const [results, setResults] = React.useState<Card[]>([])
  const [query, setQuery] = React.useState("")
  const [cursor, setCursor] = React.useState(0)
  // filter buttons
  const [selectedFactions, handleSelectFaction] = useToggleMap(["Pirate", "Imperial", "Trader", "Ghost", "Devoted", "Neutral"])
  const [selectedTypes, handleSelectType] = useToggleMap(["Captain", "Structure", "Cannon", "Asset", "Crew", "Maneuver", "Special Ammo"])

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
    if (e.keyCode === 38 && cursor > 0) { // up
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < results.length - 1) { // down
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) { // enter
      // Ideally this would trigger a modal for this item
      // but I have no idea how to do that honestly
      handleSetSlot({ quantity: 1, card: results[cursor] })
      setQuery("")
      setResults([])
    } else if (e.keyCode == 27) { // esc
      setResults([])
    }
  }
  //

  // all cards that are the right faction, type, and match the query in typeahead
  // then sort by name, for now
  const filtered = sortBy(
    cards.filter(c => {
      return selectedFactions[c.faction] &&
        (selectedTypes[c.type] || selectedTypes[c.subtype]) &&
        parseQuery(query)(c)
    }), ['name'])

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
      />
      <Box
        position='absolute'
        zIndex='1'
        boxShadow='md'
        bg={useColorModeValue('gray.50', 'gray.700')}
        borderRadius='lg'
        width='100%'
      >
        {results.map((card, index) => (
          <Text
            key={card.id}
            padding={2}
            fontWeight={index === cursor ? 'extrabold' : 'normal'}
          >{card.name}</Text>
        ))}
      </Box>
    </chakra.div>
    <Stack direction={['column', 'row']}>
      <ButtonGroup isAttached variant='outline' size='sm'>
        {Object.keys(selectedFactions).map(f =>
          <Tooltip label={f}>
            <Button key={f}
              onClick={() => handleSelectFaction(f)}
              variant={selectedFactions[f] ? 'solid' : 'outline'}>
              <FactionIcon faction={f} />
            </Button>
          </Tooltip>
        )}
      </ButtonGroup>
      <Spacer />
      <ButtonGroup isAttached variant='outline' size='sm'>
        {Object.keys(selectedTypes).map(t =>
          <Tooltip label={t}>
            <Button key={t}
              onClick={() => handleSelectType(t)}
              variant={selectedTypes[t] ? 'solid' : 'outline'}>
              <TypeIcon type={t} />
            </Button>
          </Tooltip>
        )}
      </ButtonGroup>
    </Stack>
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
          <Tr key={c.id}>
            <Td>
              <WithModal
                deckSlot={deckbox.slots.find(s => s.card.id == c.id) || { quantity: 0, card: c }}
                handleSetSlot={handleSetSlot}>
                <WithPopover card={c}>
                  <Link>{c.name}</Link>
                </WithPopover>
              </WithModal>
            </Td>
            <Td><TypeIcon type={c.type == "Emplacement" ? c.subtype : c.type} /></Td>
            <Td><FactionIcon faction={c.faction} /></Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  </Box>
}