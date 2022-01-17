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
        <Heading>User "{user.name}"</Heading>
        <Text>Email: {user.email}</Text>
        <Text>Name: {user.name}</Text>
      </VStack>
    </Center>
  </PageWrapper>
)