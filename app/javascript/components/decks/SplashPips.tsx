import { chakra } from "@chakra-ui/react"
import { faTint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"

export const SplashPips = ({ deckSlot, splashFactions }) => {
  const splashFaction = splashFactions.includes(deckSlot.card.faction) ?
    deckSlot.card.faction :
    undefined

  return (
    <chakra.span paddingLeft={2} color={`${splashFaction?.toLowerCase()}.500`} >
      {Array.from(Array(deckSlot.quantity).keys()).map(i => <FontAwesomeIcon key={i} icon={faTint} />)}
    </chakra.span>
  )
}