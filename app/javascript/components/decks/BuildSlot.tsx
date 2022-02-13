import { HStack, Link } from "@chakra-ui/react"
import * as React from "react"
import { SplashPips } from "./SplashPips"
import { WithModal } from "./WithModal"
import { WithPopover } from "./WithPopover"

export const BuildSlot = ({ deckSlot, splashFactions, handleSetSlot, ...props }) => {
  return (
    <HStack
      spacing={1}
      {...props}>
      {deckSlot.card.type != "Emplacement" && <span>{deckSlot.quantity}x</span>}
      <WithModal
        deckSlot={deckSlot}
        handleSetSlot={handleSetSlot}>
        <WithPopover card={deckSlot.card}>
          <Link>{deckSlot.card.name}</Link>
        </WithPopover>
      </WithModal>
      {splashFactions.includes(deckSlot.card.faction) &&
        <SplashPips
          splashFactions={splashFactions}
          deckSlot={deckSlot}
        />}
    </HStack>
  )
}