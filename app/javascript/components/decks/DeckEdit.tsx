import { Button, Input, Text, Textarea, Stack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, ButtonGroup, Divider, useToast, Box, Center, Editable, EditableInput, EditablePreview, Link, Heading, toast } from "@chakra-ui/react"
import { sumBy } from "lodash"
import * as React from "react"
import useCSRF from "../../hooks/useCSRF"
import useDeck from "../../hooks/useDeck"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import PageWrapper from "../PageWrapper"
import { BuildTab } from "./BuildTab"
import { Hold } from "./Hold"
import { Slot } from "./Slot"

const Controls = ({ deckbox, handleSave, handleDelete, handleUpdateName }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const toast = useToast()
  return (
    <VStack width='30%'>
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
          handleSave(e).then(data => {
            setIsSaving(false)
            toast({ title: 'Deck saved!', status: 'success' })
          })
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
  <VStack width='40%'>
    <Heading>Editor not fully implemented yet!</Heading>
    <Text>{deckbox.captain?.name}</Text>
    {deckbox.emplacements.map(s => <Slot deckSlot={s} showQuantity={false} key={s.card.id} />)}
    <Hold deckbox={deckbox} />
  </VStack>
)

const Browser = ({ tabs, ...props }) => {
  return (
    <Tabs width='30%'>
      <TabList>
        {tabs.map(t => <Tab key='t'>{t}</Tab>)}
      </TabList>
      <TabPanels>
        {React.Children.map(props.children, c => <TabPanel>{c}</TabPanel>)}
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
          // FOR NOW
          // tabs={["Build", "Description"]}
          tabs={["Description"]}
        >
          {/* FOR NOW */}
          {/* <BuildTab
            cards={cards}
            handleAdd={addCard}
            handleRemove={removeCard}
          /> */}
          < Textarea
            value={deckbox.description}
            placeholder='What is this deck all about?'
            size='sm'
            rows={25}
            onBlur={(e) => setDescription(e.target.value)}
          />
        </Browser>
      </Stack>
    </PageWrapper>
  )
}