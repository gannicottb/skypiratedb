import { HStack, Text, Spacer, VStack, Link } from "@chakra-ui/react";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { CaptainBadge } from "./CaptainBadge";

/* Compact representation of a deck in a list */
export default ({ deck, ...props }) => (
  <HStack width='100%' {...props}>
    <CaptainBadge deck={deck} />
    <VStack alignItems='flex-start'>
      <Link href={`/decks/${deck.id}`}>{deck.name}</Link>
      <Link color='gray.500' href={`/users/${deck.user.id}`}>{deck.user.name}</Link>
    </VStack>
    <Spacer />
    <Text><FontAwesomeIcon icon={faCalendarAlt} /> {new Date(deck.created_at).toDateString()}</Text>
  </HStack>
)