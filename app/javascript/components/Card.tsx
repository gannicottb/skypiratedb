import * as React from 'react'
import { Box, Image, IconButton, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

type CardProps = {
  displayMode: string
  card: Card
}
export const Card = ({ card, displayMode }: CardProps) => {
  const [onFront, toggleSide] = React.useState(true)
  const currentSide = onFront ? card : card.back
  return (
    <LinkBox maxW='200px' borderWidth='.1em' borderRadius='sm'>
      <LinkOverlay href={`/cards/${card.id}`}></LinkOverlay>
      {displayMode == 'image' &&
        <Image src={currentSide.image_url} alt={currentSide.name} />
      }
      {displayMode == 'text' &&
        <>
          <Box>{currentSide.unique ? '\u2605' : ""}{currentSide.name}</Box>
          <Box>{[currentSide.faction, currentSide.type].join(" ")}</Box>
          {currentSide.ammo && <Box>Ammo: {currentSide.ammo}</Box>}
          {currentSide.durability && <Box>Durability: {currentSide.durability}</Box>}
          {currentSide.attack && <Box>{currentSide.attack}/{currentSide.defense}</Box>}
          {currentSide.cost && <Box>{currentSide.cost}/{currentSide.power}</Box>}
          <Box dangerouslySetInnerHTML={{ __html: currentSide.text }} />
          <Box>#{currentSide.expansion_number} {currentSide.expansion}</Box>
        </>
      }
      {card.back &&
        <IconButton
          aria-label='Flip'
          variant='outline'
          colorScheme='teal'
          onClick={() => toggleSide(!onFront)}
          icon={<FontAwesomeIcon icon={faSyncAlt} />} />
      }
    </LinkBox>
  )
}