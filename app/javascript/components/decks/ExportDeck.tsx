import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import * as React from "react"

export const ExportDeck = ({ deckbox, children, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const exportText = deckbox.slots.map(s => `${s.quantity} ${s.card.name}`).join("\n")

  return (
    <Box {...props}>
      {React.cloneElement(React.Children.only(children), { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Export
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              rows={15}
              value={exportText}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}