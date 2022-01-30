import { Button, Input, Text, Textarea, Stack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, ButtonGroup, Divider } from "@chakra-ui/react"
import * as React from "react"
import useDeck, { Deckbox } from "../../hooks/useDeck"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import PageWrapper from "../PageWrapper"
import { Slot } from "./Slot"


const Controls = ({ deckbox, handleSave, handleDelete }) => {
  return (
    <VStack>
      <Text>{deckbox.name}</Text>
      <Button>Save deck</Button>
      <Button>Delete deck</Button>
    </VStack>
  )
}

interface EditorProps {
  deckbox: Deckbox,
  handleAdd: any,
  handleRemove: any
}
const Editor = ({ deckbox, handleAdd, handleRemove }: EditorProps) => (
  <VStack>
    <Text>{deckbox.captain.name}</Text>
    {deckbox.emplacements.map(s => <Slot slot={s} showQuantity={false} key={s.card.id} />)}
    {Object.entries(deckbox.holdMap).map(([type, cards]) =>
      <div key={type}>
        <Text>{type} ({cards.length})</Text>
        {cards.map(s => <Slot slot={s} showQuantity={true} key={s.card.id} />)}
      </div>
    )}
  </VStack>
)

const Browser = ({ deckbox, cards, handleAdd, handleRemove }) => {
  const [results, setResults] = React.useState<Card[]>([])
  const [query, setQuery] = React.useState("")
  const [cursor, setCursor] = React.useState(0)

  const doSearch = (q) => {
    const results = cards.filter((card) => card.name.toLowerCase().includes(q.toLowerCase()))
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
      handleAdd({ quantity: 1, card: results[cursor] })
      setQuery("")
      setResults([])
    }
  }
  return (
    <Tabs width='30%'>
      <TabList>
        <Tab>Build</Tab>
        <Tab>Description</Tab>
        <Tab>...</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Input
            placeholder='Find a card'
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={query}
            autoFocus
          ></Input>
          {results.map((card, index) => (
            <Text
              border={index === cursor ? "2px black solid" : "none"}
            >{card.name}</Text>
          ))}
          <ButtonGroup isAttached variant='outline' size='sm'>
            {["Pirate", "Imperial", "Trader", "Ghost", "Devoted", "Neutral"].map(t =>
              <Button>{t}</Button>
            )}
          </ButtonGroup>
          <Divider />
          <ButtonGroup isAttached variant='outline' size='sm'>
            {["Captain", "Cannon", "Structure", "Asset", "Crew", "Maneuver", "Special Ammo"].map(t =>
              <Button>{t[0]}</Button>
            )}
          </ButtonGroup>
        </TabPanel>
        <TabPanel>
          <Textarea
            value={deckbox.description}
            placeholder='What is this deck all about?'
            size='sm'
          />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

// Wrap it all up
export default ({ deck, cards, current_user }) => {
  // maintain the internal deck state
  const [current, setCurrent] = React.useState(deck)
  // enhance the current deck
  const deckbox = useDeck(current)

  // TODO: 
  // const storageKey = `deck_${deck.id}_${current_user.id}`
  // const [unsavedChanges, setUnsavedChanges] = useLocalStorage(storageKey, {})

  const addCard = ({ quantity, card }) => {
    const updated: Deck = deepCopy(current)
    const existing = updated.slots.filter(s => s.card.id == card.id)?.[0]
    const rest = updated.slots.filter(s => s.card.id != card.id)

    if (existing) {
      // Increase quantity.
      updated.slots = rest.concat(
        { ...existing, quantity: Math.max(existing.quantity + quantity, 2) }
      )
    } else {
      // Add new card
      updated.slots = rest.concat(
        { quantity, card }
      )
    }
    setCurrent(updated)
  }
  const removeCard = ({ quantity, card }) => {
    const updated: Deck = deepCopy(current)
    const existing = updated.slots.filter(s => s.card.id == card.id)?.[0]
    const rest = updated.slots.filter(s => s.card.id != card.id)

    const newQuantity = Math.min(existing.quantity - quantity, 0)
    if (existing && newQuantity > 0) {
      // Decrease quantity.
      updated.slots = rest.concat(
        { ...existing, quantity: newQuantity }
      )
      setCurrent(updated)
    }
  }
  const saveDeck = () => (true)
  const deleteDeck = () => (true)

  return (
    <PageWrapper current_user={current_user}>
      <Stack
        direction={['column', 'row']}
        justifyContent='space-between'>
        <Controls
          deckbox={deckbox}
          handleSave={saveDeck}
          handleDelete={deleteDeck}
        />
        <Editor
          deckbox={deckbox}
          handleAdd={addCard}
          handleRemove={removeCard}
        />
        <Browser
          deckbox={deckbox}
          cards={cards}
          handleAdd={addCard}
          handleRemove={removeCard}
        />
      </Stack>
    </PageWrapper>
  )
}