import PageWrapper from "../PageWrapper";
import * as React from "react";
import { Center, Heading, Text, VStack } from "@chakra-ui/layout";

interface UserShowProps {
  user: User,
  current_user: User
}

export default ({ user, current_user }: UserShowProps) => {
  const queryParams = window.location.search.substring(1).split('&').map(p => p.split("="))
  const isNewUser = queryParams.find(([k, v]) => k == "new" && v == "true")?.length > 0

  return (
    <PageWrapper current_user={current_user}>
      <Center>
        <VStack>
          <Heading>{user.name}</Heading>
          <Text>Member since {new Date(user.created_at).toDateString()}</Text>
          {isNewUser && <Text fontSize='xl'>This account isn't active yet. Check your email for instructions!</Text>}
        </VStack>
      </Center>
    </PageWrapper>
  )
}