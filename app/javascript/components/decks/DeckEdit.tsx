import { Button, Image, Text, Textarea, Stack, VStack, Tab, TabList, TabPanel, TabPanels, Tabs, Divider, useToast, Editable, EditableInput, EditablePreview, Link, HStack, RadioGroup, Radio } from "@chakra-ui/react"
import { faCheck, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { sumBy, isEqual } from "lodash"
import * as React from "react"
import useCSRF from "../../hooks/useCSRF"
import useDeck from "../../hooks/useDeck"
import PageWrapper from "../PageWrapper"
import { BuildSlot } from "./BuildSlot"
import { BuildTab } from "./BuildTab"
import { Emplacements } from "./Emplacements"
import { ExportDeck } from "./ExportDeck"
import { Hold } from "./Hold"
import { WithPopover } from "./WithPopover"

const Controls = ({ deckbox, handleSave, handleDelete, handleUpdateAttr, isDirty }) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const toast = useToast()
  return (
    <VStack alignSelf='start' alignItems='start'>
      <Editable fontSize='lg' fontWeight='bold' defaultValue={deckbox.name}>
        <EditablePreview />
        <EditableInput
          onBlur={(e) => handleUpdateAttr('name', e.target.value)}
        />
      </Editable>
      <RadioGroup
        onChange={() => handleUpdateAttr('public', !deckbox.public)}
        value={Number(deckbox.public)}>
        <Stack direction='row'>
          <Radio value={1}>Public</Radio>
          <Radio value={0}>Private</Radio>
        </Stack>
      </RadioGroup>
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
        >Save{isDirty && '*'}</Button>
        <Button
          as='a'
          href={`/decks/${deckbox.id}`}
          colorScheme='blue'
        >View</Button>
        <ExportDeck deckbox={deckbox}>
          <Button colorScheme='teal'>
            Export
          </Button>
        </ExportDeck>
        <Button
          onClick={() => {
            if (confirm("Are you sure? Deletion is final.")) {
              handleDelete()
            }
          }}
          variant='outline'
          colorScheme='red'
        >Delete</Button>
      </HStack>
    </VStack>
  )
}

const Summary = ({ deckbox }) => {
  const totalSplashes = sumBy(deckbox.splash, (s: DeckSlot) => s.quantity)
  const listOfSplashes = deckbox.splashFactions.join(", ")
  const totalHold = sumBy(deckbox.hold, (s: DeckSlot) => s.quantity)

  const validation = {
    "splash": totalSplashes <= 6 && deckbox.splashFactions.length <= 1,
    "emplacements": deckbox.emplacements.length == 4,
    "hold": totalHold == 30
  }
  const validIcon = (key: string) => (
    <FontAwesomeIcon icon={validation[key] ? faCheck : faQuestion} />
  )
  return (
    <>
      <Text>{totalSplashes}/6 splashes from {listOfSplashes} {validIcon("splash")}</Text>
      <Text>{deckbox.emplacements.length}/4 emplacements {validIcon("emplacements")}</Text>
      <Text>{totalHold}/30 cards in Hold {validIcon("hold")}</Text>
    </>
  )
}

const Editor = ({ deckbox, handleSetSlot, ...props }) => (
  <VStack>
    <Stack direction={['column', 'row']} alignSelf='start'>
      <Image width={32} objectFit='contain' src={deckbox.captain?.image_url} />
      <VStack align='start'>
        <WithPopover
          card={deckbox.captain}>
          <Link fontSize='xl' href={`/cards/${deckbox.captain?.id}`}>{deckbox.captain?.name}</Link>
        </WithPopover>
        <Summary deckbox={deckbox} />
      </VStack>
    </Stack>
    <Divider />
    <Emplacements
      deckbox={deckbox}
      emplacementItem={(s) =>
        <BuildSlot
          handleSetSlot={handleSetSlot}
          splashFactions={deckbox.splashFactions}
          deckSlot={s}
          key={s.card.id} />
      }
    />
    <Hold
      deckbox={deckbox}
      holdItem={(s) =>
        <BuildSlot
          handleSetSlot={handleSetSlot}
          splashFactions={deckbox.splashFactions}
          deckSlot={s}
          key={s.card.id}
        />}
    />
    <Divider />
    {React.Children.map(props.children, c => c)}
  </VStack>
)

const Browser = ({ deckbox, cards, handleSetSlot, handleUpdateAttr, ...props }) => {
  return (
    <Tabs width='50%' {...props}>
      <TabList>
        {["Build", "Description"].map(t => <Tab key={t}>{t}</Tab>)}
      </TabList>
      <TabPanels>
        <TabPanel>
          <BuildTab
            deckbox={deckbox}
            cards={cards}
            handleSetSlot={handleSetSlot}
          />
        </TabPanel>
        <TabPanel>
          <Textarea
            defaultValue={deckbox.description}
            placeholder='What is this deck all about?'
            size='sm'
            rows={25}
            onBlur={(e) => handleUpdateAttr('description', e.target.value)}
          />
        </TabPanel>
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
  // "checkpoint" that tells us if we have unsaved changes
  const [lastSave, setLastSave] = React.useState(deck)
  // maintain the internal deck state
  const [current, setCurrent] = React.useState(deck)
  // enhance the current deck
  const deckbox = useDeck(current)

  const csrfMeta = useCSRF()

  const isDirty = React.useMemo(() => !isEqual(lastSave, current), [lastSave, current])

  const maxCardsFor = (type: string) => {
    return {
      "Captain": 1,
      "Emplacement": 1
    }[type] || 2
  }

  const setSlot = ({ quantity, card }) => {
    const updated: Deck = deepCopy(current)
    const existing = updated.slots.filter(s => s.card.id == card.id)?.[0]
    const rest = updated.slots.filter(s => s.card.id != card.id)

    if (existing) {
      // Update existing slot
      console.log(`update existing: ${existing.quantity} -> ${quantity}x  ${card.name}`)
      updated.slots = rest.concat(
        { ...existing, quantity }
      )
    } else {
      // Add a new slot
      console.log(`add new: ${quantity}x ${card.name}`)
      if (card.type == "Captain") {
        // Handle adding a captain differently. There can only be one.
        updated.slots = rest.filter(s => s.card.type != "Captain").concat(
          { quantity: 1, card }
        )
        updated.captain = card
      } else {
        updated.slots = rest.concat(
          { quantity: Math.min(quantity, maxCardsFor(card.type)), card }
        )
      }
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
          public: current.public,
          deck_slots_attributes: current.slots.map(s => ({ id: s.id, quantity: s.quantity, card_id: s.card.id }))
        }
      })
    }).then(response => response.json())
      .then(json => {
        setCurrent(json.deck)
        setLastSave(json.deck)
      })
  }
  const deleteDeck = () => {
    fetch(`/decks/${current.id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfMeta.content
      }
    }).then(data => window.location.href = data.url)
  }

  const setAttribute = (k, v) => {
    let updated = deepCopy(current)
    updated[k] = v
    setCurrent(updated)
  }

  return (
    <PageWrapper current_user={current_user} maxW='container.xl'>
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
            handleUpdateAttr={setAttribute}
            isDirty={isDirty}
          />
        </Editor>
        <Browser
          deckbox={deckbox}
          cards={cards}
          handleSetSlot={setSlot}
          handleUpdateAttr={setAttribute}
        />
      </Stack>
    </PageWrapper>
  )
}