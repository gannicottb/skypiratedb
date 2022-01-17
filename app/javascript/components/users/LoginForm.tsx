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
  useBoolean,
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

export const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const [registerMode, setRegisterMode] = useBoolean()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const [username, setUsername] = React.useState("")
  const onInputChange = (fn) => (ev) => fn(ev.target.value)

  const csrfMeta = document.getElementsByName('csrf-token')[0] as HTMLMetaElement;

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        // your login logic here
        if (registerMode) {
          console.log(username)
          console.log(password === passwordConfirm)

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
            console.log(data)
            window.location.href = data.url
          })
        } else {
          console.log({ email: email, password: password })

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

            console.log(data)
            window.location.href = data.url
          })

        }

      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input value={email} onChange={onInputChange(setEmail)} name="email" type="email" autoComplete="email" required />
        </FormControl>
        {registerMode &&
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={onInputChange(setUsername)} name="username" type="text" required />
          </FormControl>
        }
        <PasswordField value={password} onChange={onInputChange(setPassword)} />
        {registerMode && <PasswordField label="Repeat password" value={passwordConfirm} onChange={onInputChange(setPasswordConfirm)} />}
        <Checkbox>Remember me</Checkbox>
        <HStack spacing="4">
          <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
            {registerMode ? 'Register' : 'Sign in'}
          </Button>
          {registerMode ?
            <Text>Already have an account? <Link onClick={setRegisterMode.off}>Sign in</Link></Text> :
            <Link onClick={setRegisterMode.on}>Register</Link>}
          <Link fontWeight="semibold" fontSize="sm">Forgot password?</Link>
        </HStack>
      </Stack>
    </chakra.form>
  )
}