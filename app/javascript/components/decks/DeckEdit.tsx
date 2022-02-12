import { Button, Input, Image, Text, Textarea, Stack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, ButtonGroup, Divider, useToast, Box, Center, Editable, EditableInput, EditablePreview, Link, Heading, toast, HStack } from "@chakra-ui/react"
import { sumBy } from "lodash"
import * as React from "react"
import useCSRF from "../../hooks/useCSRF"
import useDeck from "../../hooks/useDeck"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import PageWrapper from "../PageWrapper"
import { BuildSlot } from "./BuildSlot"
import { BuildTab } from "./BuildTab"
import { Emplacements } from "./Emplacements"
import { Hold } from "./Hold"
import { Slot } from "./Slot"

const Controls = ({ deckbox, handleSave, handleDelete, handleUpdateName }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const toast = useToast()
  return (
    <>
      <Editable fontSize='lg' fontWeight='bold' defaultValue={deckbox.name}>
        <EditablePreview />
        <EditableInput
          onBlur={(e) => handleUpdateName(e.target.value)}
        />
      </Editable>
      <HStack>
        <Button
          onClick={(e) => {
            setIsSaving(true)
            handleSave(e)
              .then(data => {
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
      </HStack>
    </>
  )
}

const Editor = ({ deckbox, handleSetSlot, ...props }) => (
  <VStack>
    <Stack direction={['column', 'row']} alignSelf='start'>
      <Image width={32} objectFit='contain' src={deckbox.captain?.image_url} />
      <VStack align='start'>
        <Text fontSize='xl'>{deckbox.captain?.name}</Text>
        <Text>{sumBy(deckbox.splash, (s: DeckSlot) => s.quantity)}/6 splashes from {deckbox.splashFactions}</Text>
        <Text>{sumBy(deckbox.hold, (s: DeckSlot) => s.quantity)} cards</Text>
      </VStack>
    </Stack>
    <Divider />
    <Emplacements emplacements={deckbox.emplacements} />
    <Hold
      deckbox={deckbox}
      // holdItem={(s) => <Slot deckSlot={s} showQuantity={true} key={s.card.id} />}
      holdItem={(s) => <BuildSlot handleSetSlot={handleSetSlot} deckSlot={s} key={s.card.id} />}
    />
    {React.Children.map(props.children, c => c)}
  </VStack>
)

const Browser = ({ tabs, ...props }) => {
  return (
    <Tabs width='50%'>
      <TabList>
        {tabs.map(t => <Tab key={t}>{t}</Tab>)}
      </TabList>
      <TabPanels>
        {React.Children.map(props.children, c => <TabPanel key={1}>{c}</TabPanel>)}
      </TabPanels>
    </Tabs>
  )
}

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

interface DeckEditProps {
  deck: Deck
  cards: Card[]
  current_user: User
}
// Wrap it all up
export default ({ deck, cards, current_user }: DeckEditProps) => {
  // maintain the internal deck state
  const [current, setCurrent] = React.useState(deck)
  // enhance the current deck
  const deckbox = useDeck(current)

  const csrfMeta = useCSRF()

  // TODO: 
  // const storageKey = `deck_${deck.id}_${current_user.id}`
  // const [unsavedChanges, setUnsavedChanges] = useLocalStorage(storageKey, {})

  const setSlot = ({ quantity, card }) => {
    const updated: Deck = deepCopy(current)
    const existing = updated.slots.filter(s => s.card.id == card.id)?.[0]
    const rest = updated.slots.filter(s => s.card.id != card.id)

    if (existing) {
      // Update existing slot
      updated.slots = rest.concat(
        { ...existing, quantity }
      )
    } else {
      // Add a new slot
      updated.slots = rest.concat(
        { quantity, card }
      )
    }
    // Remove emmpty slots
    updated.slots = updated.slots.filter(s => s.quantity > 0)

    setCurrent(updated)
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
      body: JSON.stringify({
        deck: {
          name: current.name,
          description: current.description,
          deck_slots_attributes: current.slots.map(s => ({ id: s.id, quantity: s.quantity, card_id: s.card.id }))
        }
      })
    }).then(response => response.json())
      .then(json => setCurrent(json.deck))
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

        <Editor
          deckbox={deckbox}
          handleSetSlot={setSlot}
        >
          <Controls
            deckbox={deckbox}
            handleSave={saveDeck}
            handleDelete={deleteDeck}
            handleUpdateName={setName}
          />
        </Editor>
        <Browser
          tabs={["Build", "Description"]}
        >
          <BuildTab
            cards={cards}
            handleSetSlot={setSlot}
          />
          < Textarea
            defaultValue={deckbox.description}
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