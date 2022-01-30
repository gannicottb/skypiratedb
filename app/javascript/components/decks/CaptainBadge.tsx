import { Avatar } from "@chakra-ui/react";
import * as React from "react";

/* Wraps an Avatar based on deck info */
export const CaptainBadge = ({ deck, ...props }) => (
  <Avatar
    borderWidth={2}
    borderColor={`${deck.faction?.toLowerCase()}.500`}
    size='lg'
    name={deck.captain?.name}
    src={deck.captain?.image_url}
    {...props} />
)