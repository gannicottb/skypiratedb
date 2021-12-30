import PageWrapper from "../PageWrapper";
import * as React from 'react'
import { LoginForm } from "./LoginForm";
import { Center } from "@chakra-ui/react";

export default () => (
  <PageWrapper>
    <Center>
      <LoginForm width="md"></LoginForm>
    </Center>
  </PageWrapper>
)