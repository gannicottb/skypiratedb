import { useDisclosure, Box, Image, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, HStack, ButtonGroup, Link } from "@chakra-ui/react"

import * as React from "react"
import { Card } from "../Card"

/*
It really seems like instead of add/remove we just want

setSlot(qty, card)

with a reducer. If we get a new one, add it. If we get an existing one, set qty.
if the qty is 0, remove it.
*/

export const BuildSlot = ({ deckSlot, handleSetSlot, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const maxCardsFor = (type: string) => {
    switch (type) {
      case "Captain":
      case "Emplacement":
        return 1;
      default:
        return 2;
    }
  }
  const quantityOptions = Array.from(Array(maxCardsFor(deckSlot.card.type) + 1).keys())

  return (
    <Box {...props}>
      <Popover isLazy trigger='hover' placement='auto'>
        <span>{deckSlot.quantity}x </span>
        <PopoverTrigger>
          <Link onClick={onOpen}>{deckSlot.card.name}</Link>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Card card={deckSlot.card} displayMode="text"></Card>
          </PopoverBody>
        </PopoverContent>
      </Popover>
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