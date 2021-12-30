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

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault()
        // your login logic here
        if (registerMode) {
          console.log(username)
          console.log(password === passwordConfirm)
        } else {
          console.log({ email: email, password: password })
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