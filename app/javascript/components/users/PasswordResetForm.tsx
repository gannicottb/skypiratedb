import {
  Button,
  chakra,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

export const PasswordResetForm = ({ token, user }) => {
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const onInputChange = (fn) => (ev) => fn(ev.target.value)
  const csrfMeta = document.getElementsByName('csrf-token')[0] as HTMLMetaElement;

  const submitNewPassword = () => (
    fetch(`/password_resets/${token}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfMeta.content
      },
      body: JSON.stringify({ user: { password: password, password_confirmation: passwordConfirm } })
    }).then(data => {
      window.location.href = data.url
    })
  )

  return (
    <chakra.form
      width="md"
      onSubmit={(e) => {
        e.preventDefault()
        submitNewPassword()
      }}
    >
      <Stack spacing="6">
        <PasswordField
          id="new-password"
          value={password}
          label="New password"
          onChange={onInputChange(setPassword)} />
        <PasswordField
          id="repeat-password"
          label="Repeat password"
          value={passwordConfirm}
          onChange={onInputChange(setPasswordConfirm)} />
        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
          Change my password
        </Button>
      </Stack>
    </chakra.form >
  )
}