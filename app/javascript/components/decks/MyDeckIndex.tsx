import { Box, Button, Divider, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import * as React from "react"
import PageWrapper from "../PageWrapper"
import DeckListItem from "./DeckListItem"

function ImportControl() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [text, setText] = React.useState("")
  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setText(inputValue)
  }
  const onSubmit = () => {
    onClose();
    console.log(text)
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
      <Heading>My Decks</Heading>
      <Divider />
      <ImportControl />
      {decks.map(d => <DeckListItem deck={d} key={d.id} />)}
    </PageWrapper>
  )
}