import {
  Box,
  Button,
  Text,
  chakra,
  Stack,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

export const PasswordResetForm = ({ token, user }) => {
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const [errors, setErrors] = React.useState([])
  const isError = errors.length > 0
  const [isSuccess, setIsSuccess] = React.useState(false)
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
    })
      .then(response => response.json())
      .then(json => {
        if (json.errors.length > 0) {
          setIsSuccess(false)
          setErrors(json.errors)
        } else {
          setIsSuccess(true)
          setErrors([])
        }
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
      {isError && <UnorderedList>
        {errors.map((e, i) =>
          <ListItem key={i}>{e}</ListItem>
        )}
      </UnorderedList>}
      {isSuccess ? (
        <Text fontsize='lg'>Password was successfully updated!</Text>
      ) : (
        <Stack spacing="6">
          <PasswordField
            id="new-password"
            value={password}
            label="New password"
            onChange={onInputChange(setPassword)} />
          <PasswordField
            isInvalid={password != passwordConfirm}
            id="repeat-password"
            label="Repeat password"
            value={passwordConfirm}
            onChange={onInputChange(setPasswordConfirm)} />
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
            Change my password
          </Button>
        </Stack>
      )}
    </chakra.form>
  )
}