import { useDisclosure, Box, Image, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, HStack, ButtonGroup, Link, chakra } from "@chakra-ui/react"
import { faCircle, faTint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import * as React from "react"
import { Card } from "../Card"
import { EmplacementSlot } from "./EmplacementSlot"
import { GenericSlot } from "./GenericSlot"

//  GenericSlot wrapping a Link with a Modal that opens on click
export const BuildSlot = ({ deckSlot, splashFactions, handleSetSlot, ...props }) => {
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
      <GenericSlot
        deckSlot={deckSlot}
        splashFactions={splashFactions}>
        <Link onClick={onOpen}>{deckSlot.card.name}</Link>
      </GenericSlot>
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