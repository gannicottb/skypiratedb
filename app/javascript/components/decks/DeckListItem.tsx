import { Heading, HStack, Link } from "@chakra-ui/react";
import * as React from "react";

/* Compact representation of a deck in a list */
export default ({ deck, ...props }) => (
  <HStack {...props}>
    {/* <Avatar size='sm' name={deck.card.name} src={slot.card.image_url} /> */}
    <Link href={`/decks/${deck.id}`}>{deck.name}</Link>
  </HStack>

)