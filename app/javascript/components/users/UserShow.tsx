import PageWrapper from "../PageWrapper";
import * as React from "react";
import { Center, Heading, Text, VStack } from "@chakra-ui/layout";

interface UserShowProps {
  user: User,
  current_user: User
}

export default ({ user, current_user }: UserShowProps) => (
  <PageWrapper current_user={current_user}>
    <Center>
      <VStack>
        <Heading>{user.name}</Heading>
        <Text>Member since {new Date(user.created_at).toDateString()}</Text>
      </VStack>
    </Center>
  </PageWrapper>
)