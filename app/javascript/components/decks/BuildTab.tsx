import { Text, Input, ButtonGroup, Button, Divider } from "@chakra-ui/react"
import * as React from "react"

import { useFilter } from '../../hooks/useFilter'

export const BuildTab = ({ cards, handleSetSlot }) => {
  const [results, setResults] = React.useState<Card[]>([])
  const [query, setQuery] = React.useState("")
  const [cursor, setCursor] = React.useState(0)

  const parseQuery = useFilter()

  const doSearch = (q) => {
    const results = cards.filter(parseQuery(q))
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
    }
  }

  return <>
    <Input
      placeholder='Find a card'
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      value={query}
      autoFocus
    ></Input>
    {results.map((card, index) => (
      <Text
        key={card.id}
        border={index === cursor ? "2px black solid" : "none"}
      >{card.name}</Text>
    ))}
    <ButtonGroup isAttached variant='outline' size='sm'>
      {["Pirate", "Imperial", "Trader", "Ghost", "Devoted", "Neutral"].map(t =>
        <Button key={t}>{t}</Button>
      )}
    </ButtonGroup>
    <Divider />
    <ButtonGroup isAttached variant='outline' size='sm'>
      {["Captain", "Cannon", "Structure", "Asset", "Crew", "Maneuver", "Special Ammo"].map(t =>
        <Button key={t}>{t[0]}</Button>
      )}
    </ButtonGroup>
  </>
}