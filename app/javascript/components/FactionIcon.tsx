import GhostIcon from 'images/ghost.png'
import PirateIcon from 'images/pirate.png'
import TraderIcon from 'images/trader.png'
import DevotedIcon from 'images/devoted.png'
import ImperialIcon from 'images/imperial.png'
import NeutralIcon from 'images/neutral.png'
import { Image, Tooltip } from "@chakra-ui/react"
import * as React from 'react'

const IconMap = {
  "Pirate": PirateIcon,
  "Trader": TraderIcon,
  "Imperial": ImperialIcon,
  "Ghost": GhostIcon,
  "Devoted": DevotedIcon,
  "Neutral": NeutralIcon
}

export const FactionIcon = ({ faction }) => (
  <Image src={IconMap[faction]} width='20px' />
)