import { Button, Input, Text, Textarea, Stack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, ButtonGroup, Divider, useToast, Box, Center, Editable, EditableInput, EditablePreview, Link, Heading } from "@chakra-ui/react"
import { sumBy } from "lodash"
import * as React from "react"
import useCSRF from "../../hooks/useCSRF"
import useDeck from "../../hooks/useDeck"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import PageWrapper from "../PageWrapper"
import { Hold } from "./Hold"
import { Slot } from "./Slot"

const Controls = ({ deckbox, handleSave, handleDelete, handleUpdateName }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  return (
    <VStack>
      <Editable fontSize='lg' fontWeight='bold' defaultValue={deckbox.name}>
        <EditablePreview />
        <EditableInput
          onBlur={(e) => handleUpdateName(e.target.value)}
        />
      </Editable>
      <Text>{sumBy(deckbox.splash, (s: DeckSlot) => s.quantity)}/6 splashes from {deckbox.splashFactions}</Text>
      <Text>{sumBy(deckbox.hold, (s: DeckSlot) => s.quantity)} cards</Text>
      <Divider />
      <Button
        onClick={(e) => {
          setIsSaving(true)
          handleSave(e).then(data => setIsSaving(false))
        }}
        colorScheme='green'
        isLoading={isSaving}
      >Save</Button>
      <Button
        as='a'
        href={`/decks/${deckbox.id}`}
        colorScheme='blue'
      >View</Button>
      <Button
        onClick={handleDelete}
        variant='outline'
        colorScheme='red'
      >Delete</Button>
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
    <Heading>Editor not fully implemented yet!</Heading>
    <Text>{deckbox.captain.name}</Text>
    {deckbox.emplacements.map(s => <Slot slot={s} showQuantity={false} key={s.card.id} />)}
    <Hold deckbox={deckbox} />
  </VStack>
)

const Browser = ({ deckbox, cards, handleAdd, handleRemove, handleUpdateDescription }) => {
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
        </TabPanel>
        <TabPanel>
          <Textarea
            value={deckbox.description}
            placeholder='What is this deck all about?'
            size='sm'
            rows={25}
            onChange={(e) => handleUpdateDescription(e.target.value)}
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

  const csrfMeta = useCSRF()

  const toast = useToast()

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
  const saveDeck = (e) => {
    e.preventDefault()

    return fetch(`/decks/${current.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfMeta.content
      },
      body: JSON.stringify({ deck: { name: current.name, description: current.description } })
    })
  }
  const deleteDeck = () => (true)

  const setDescription = (description: string) => {
    const updated = deepCopy(current)
    updated.description = description
    setCurrent(updated)
  }

  const setName = (name: string) => {
    const updated = deepCopy(current)
    updated.name = name
    setCurrent(updated)
  }

  return (
    <PageWrapper current_user={current_user}>
      <Stack
        direction={['column', 'row']}
        justifyContent='space-between'>
        <Controls
          deckbox={deckbox}
          handleSave={saveDeck}
          handleDelete={deleteDeck}
          handleUpdateName={setName}
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
          handleUpdateDescription={setDescription}
        />
      </Stack>
    </PageWrapper>
  )
}