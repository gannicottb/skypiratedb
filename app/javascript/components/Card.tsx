import * as React from 'react'
import { VStack, Text, Box, Image, IconButton, LinkBox, LinkOverlay, Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

const CardFaceText = ({ card }) => (
  <>
    <Text fontSize='2xl'>{card.unique ? '\u2605' : ""}{card.name}</Text>
    <Text>{
      [
        [card.faction, card.type].join(" "),
        card.subtype || ""
      ].filter(x => x !== "").join(" - ")
    }</Text>
    {card.ammo && <Text>Ammo: {card.ammo}</Text>}
    {card.durability && <Text>Durability: {card.durability}</Text>}
    {card.attack && <Text>{card.attack}/{card.defense}</Text>}
    {card.cost && <Text>{card.cost}/{card.power}</Text>}
    <Divider />
    <Box
      borderLeft={2}
      borderColor='darkslateblue'
      dangerouslySetInnerHTML={{ __html: card.text }} />
    <Divider />
    <Text>#{card.expansion_number} {card.expansion}</Text>
    <Text fontSize='sm'>Illustrated by {card.artist}</Text>
  </>
)

const CardTextOnly = ({ card }) => (
  <VStack align='flex-start'>
    <CardFaceText card={card} />
    {card.back && <>
      <Divider />
      <CardFaceText card={card.back} />
    </>
    }
  </VStack>
)

const Flipper = ({ handleClick }) => (
  <IconButton
    aria-label='Flip'
    variant='outline'
    backgroundColor='blackAlpha.500'
    onClick={handleClick}
    pos="absolute"
    bottom="50%"
    right="5%"
    icon={<FontAwesomeIcon icon={faSyncAlt} />} />
)

const CardImage = ({ card }) => {
  const [onFront, toggleSide] = React.useState(true)
  const currentSide = onFront ? card : card.back

  return (
    <>
      <Image src={currentSide.image_url} alt={currentSide.name} />
      {card.back && <Flipper handleClick={() => toggleSide(!onFront)} />}
    </>
  )
}

type CardProps = {
  displayMode: string
  card: Card
}
export const Card = ({ card, displayMode }: CardProps) => {
  return (
    <LinkBox maxW='fit-content' borderWidth={1} borderRadius='sm' p={2}>
      <LinkOverlay href={`/cards/${card.id}`}></LinkOverlay>
      {displayMode === 'image' && <CardImage card={card} />}
      {displayMode === 'text' && <CardTextOnly card={card} />}
    </LinkBox>
  )
}