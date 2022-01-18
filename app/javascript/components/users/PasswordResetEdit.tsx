import { Center } from "@chakra-ui/react";
import * as React from "react";
import PageWrapper from "../PageWrapper";
import { PasswordResetForm } from "./PasswordResetForm";

export default ({ token, user, current_user }) => (
  <PageWrapper current_user={current_user}>
    <Center>
      <PasswordResetForm token={token} user={user} />
    </Center>
  </PageWrapper>
)