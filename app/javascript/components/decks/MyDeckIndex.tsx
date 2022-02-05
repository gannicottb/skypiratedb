import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Heading, HStack, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react"
import * as React from "react"
import useCSRF from "../../hooks/useCSRF"
import useDeck from "../../hooks/useDeck"
import PageWrapper from "../PageWrapper"
import { CaptainBadge } from "./CaptainBadge"
import { Hold } from "./Hold"

function ImportControl() {
  const csrfMeta = useCSRF()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [text, setText] = React.useState("")
  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setText(inputValue)
  }
  const onSubmit = () => {
    onClose();
    fetch("/decks/import", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfMeta.content
      },
      body: JSON.stringify({ import: { text: text } })
    }).then(data => window.location.href = data.url)

  }
  return (
    <>
      <Button onClick={onOpen}>Import</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Paste text</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              rows={15}
              value={text}
              placeholder='1 Buddy System'
              onChange={handleInputChange} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ({ decks, current_user }) => {

  return (
    <PageWrapper current_user={current_user}>
      <VStack spacing={4} alignItems='flex-start'>
        <Heading>My Decks</Heading>
        <Divider />
        <ImportControl />
        <Accordion defaultIndex={[]} allowMultiple width='100%'>
          {decks.map(deck =>
            <AccordionItem key={deck.id}>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    {deck.name || <Text fontStyle='italic' color="gray.300">Unnamed</Text>}
                  </Box>
                  <CaptainBadge deck={deck} />
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Hold deckbox={useDeck(deck)} />
                <HStack>
                  <Link href={'/decks/' + deck.id}>View</Link>
                  <Link href={'/decks/' + deck.id + '/edit'}>Edit</Link>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </VStack>
    </PageWrapper>
  )
}