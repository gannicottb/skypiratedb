import {
  Button,
  chakra,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  HTMLChakraProps,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'
import { EmailField } from './EmailField'
import useCSRF from '../../hooks/useCSRF'

export const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const [mode, setMode] = React.useState("login") //login, register, forgot
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [resetRequested, setResetRequested] = React.useState(false)
  const onInputChange = (fn) => (ev) => fn(ev.target.value)

  const csrfMeta = useCSRF()

  const internals = () => {
    switch (mode) {
      case "login": {
        return (
          <>
            <EmailField value={email} onChange={onInputChange(setEmail)} />
            <PasswordField value={password} onChange={onInputChange(setPassword)} />
            <Checkbox>Remember me</Checkbox>
            <HStack spacing="4">
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Log in
              </Button>
              <Link onClick={() => setMode("register")}>Register</Link>
              <Link onClick={() => setMode("forgot")} fontWeight="semibold" fontSize="sm">Forgot password?</Link>
            </HStack>
          </>
        )
      }
      case "register": {
        return (
          <>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input value={username} onChange={onInputChange(setUsername)} name="username" type="text" required />
            </FormControl>
            <EmailField value={email} onChange={onInputChange(setEmail)} />
            <PasswordField value={password} onChange={onInputChange(setPassword)} />
            <PasswordField id="repeat-password" label="Repeat password" value={passwordConfirm} onChange={onInputChange(setPasswordConfirm)} />
            <HStack spacing="4">
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Register
              </Button>
              <Text>Already have an account? <Link onClick={() => setMode("login")}>Log in</Link></Text>
              <Link onClick={() => setMode("forgot")} fontWeight="semibold" fontSize="sm">Forgot password?</Link>
            </HStack>
          </>
        )
      }
      case "forgot": {
        return (
          <>
            {resetRequested ? (
              <Text>Instructions have been sent to your email.</Text>
            ) : (
              <>
                <EmailField value={email} onChange={onInputChange(setEmail)} />
                <HStack spacing="4">
                  <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                    Reset my password
                  </Button>
                  <Text>Already have an account? <Link onClick={() => setMode("login")}>Log in</Link></Text>
                  <Link onClick={() => setMode("register")}>Register</Link>
                </HStack>
              </>
            )}
          </>
        )
      }
    }
  }

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        switch (mode) {
          case "login": {
            fetch("/login", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfMeta.content
              },
              body: JSON.stringify({ user: { email, password } })
            }).then(data => {
              window.location.href = data.url
            })
            break;
          }
          case "register": {
            fetch("/users", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfMeta.content
              },
              body: JSON.stringify({ user: { email, name: username, password_confirmation: passwordConfirm, password } })
            }).then(data => {
              window.location.href = data.url + "?new=true"
            })
            break;
          }
          case "forgot": {
            fetch("/password_resets", {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfMeta.content
              },
              body: JSON.stringify({ email: email })
            }).then(response => response.json())
              .then(json => json.errors.length == 0 && setResetRequested(true))
            break;
          }
          default: {
            console.log("LoginForm submitted with unknown mode " + mode + ". No-op.")
          }
        }
      }}
      {...props}
    >
      <Stack spacing="6">
        {internals()}
      </Stack>
    </chakra.form>
  )
}