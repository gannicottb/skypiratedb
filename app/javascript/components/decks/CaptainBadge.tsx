import { Avatar, AvatarProps, Box } from "@chakra-ui/react";
import * as React from "react";

const SplashBadge = ({ deck }) => (
  <Box
    position='absolute'
    bottom='0px'
    right='0px'
    borderRadius='.6em 0em 0.9em 0em'
    borderColor={`${deck.faction?.toLowerCase()}.500`}
    borderWidth={2}
    height={3}
    width={6}
    background={`${deck.splash_faction?.toLowerCase()}.500`}
  ></Box>
)

/* Wraps an Avatar based on deck info */
interface CaptainBadgeProps extends AvatarProps {
  deck: Deck
}
export const CaptainBadge = ({ deck, ...props }: CaptainBadgeProps) => {
  return (
    <Avatar
      borderWidth={2}
      borderColor={`${deck.faction?.toLowerCase()}.500`}
      size='lg'
      name={deck.captain?.name}
      src={deck.captain?.image_url}
      {...props} ><SplashBadge deck={deck} /></Avatar>
  )
}