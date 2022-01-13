import PageWrapper from "../PageWrapper";
import * as React from "react";
import { Center, Heading, Text, VStack } from "@chakra-ui/layout";

interface UserShowProps {
  user: User
}

export default ({ user }: UserShowProps) => (
  <PageWrapper>
    <Center>
      <VStack>
        <Heading>User "{user.name}"</Heading>
        <Text>Email: {user.email}</Text>
        <Text>Name: {user.name}</Text>
      </VStack>
    </Center>
  </PageWrapper>
)