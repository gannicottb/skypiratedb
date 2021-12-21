import * as React from 'react'
import { Text, Box, Image, IconButton, LinkBox, LinkOverlay, Divider } from '@chakra-ui/react'
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
    <LinkBox maxW='300px' borderWidth='.1em' borderRadius='sm' p={2}>
      <LinkOverlay href={`/cards/${card.id}`}></LinkOverlay>
      {displayMode == 'image' &&
        <Image src={currentSide.image_url} alt={currentSide.name} />
      }
      {displayMode == 'text' &&
        <>
          <Text fontSize='2xl'>{currentSide.unique ? '\u2605' : ""}{currentSide.name}</Text>
          <Text>{
            [
              [currentSide.faction, currentSide.type].join(" "),
              currentSide.subtype || ""
            ].filter(x => x !== "").join(" - ")
          }</Text>
          {currentSide.ammo && <Text>Ammo: {currentSide.ammo}</Text>}
          {currentSide.durability && <Text>Durability: {currentSide.durability}</Text>}
          {currentSide.attack && <Text>{currentSide.attack}/{currentSide.defense}</Text>}
          {currentSide.cost && <Text>{currentSide.cost}/{currentSide.power}</Text>}
          <Divider />
          <Box
            borderLeft={2}
            borderColor='darkslateblue'
            dangerouslySetInnerHTML={{ __html: currentSide.text }} />
          <Divider />
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