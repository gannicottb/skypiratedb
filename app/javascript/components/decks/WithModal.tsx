import { Box, Button, ButtonGroup, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"

export const WithModal = ({ deckSlot, handleSetSlot, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const maxCardsFor = (type: string) => {
    return {
      "Captain": 1,
      "Emplacement": 1
    }[type] || 2
  }

  const quantityOptions = Array.from(Array(maxCardsFor(deckSlot.card.type) + 1).keys())

  return (
    <Box>
      {React.cloneElement(React.Children.only(children), { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {deckSlot.card.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ButtonGroup isAttached variant='outline' size='sm'>
              {quantityOptions.map(q =>
                <Button
                  onClick={() => {
                    handleSetSlot({ quantity: q, card: deckSlot.card })
                    onClose()
                  }}
                  isActive={q == deckSlot.quantity}
                  key={q}>
                  {q}
                </Button>
              )}
            </ButtonGroup>
            <HStack>
              <Image width={36} src={deckSlot.card.image_url} />
              <Card card={deckSlot.card} displayMode="text"></Card>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button as='a' href={`/cards/${deckSlot.card.id}`}>Go to card page</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}