import * as React from 'react'
import {
  Avatar,
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  Spacer,
  Switch,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import theme from './theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import useCSRF from '../hooks/useCSRF'

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack spacing={2}>
      <Switch onChange={toggleColorMode} />
      <FontAwesomeIcon icon={colorMode === 'light' ? faSun : faMoon} />
    </HStack>
  )
}

const UserToggle = ({ current_user }) => {
  const csrfMeta = useCSRF()
  const logout = () => (
    fetch("/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfMeta.content
      },
    }).then(data => window.location.href = data.url)
  )
  return (
    <Menu>
      <MenuButton as={Button} variant='ghost'>
        <Avatar name={current_user?.name} size='sm' />
      </MenuButton>
      <MenuList>
        {current_user && (<>
          <MenuItem><Link href={`/users/${current_user.id}`}>Profile</Link></MenuItem>
          <MenuItem>
            <Link
              href='#'
              onClick={logout}
            >Log out</Link>
          </MenuItem>
        </>)
        }
        {!current_user && <MenuItem><Link href='/login'>Login or register</Link></MenuItem>}
      </MenuList>
    </Menu>
  )
}

const Footer = () => (
  <Box
    width='100%'
    backgroundColor='gray.400'
    marginTop='auto'
    paddingBlock='14'
    paddingInline='10'
  >
    <Text>
      Submit bugs and feature requests on <Link color='blue.600' href='https://github.com/gannicottb/skypiratedb'>Github.</Link>
    </Text>
    <Text>&copy; 2025 Winding Road Games. All rights reserved.</Text>
  </Box>
)

export default ({ children, current_user, ...props }) => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Flex direction='column' minHeight='100vh'>
      <Flex bg='darkslateblue' w='100%' p={4} textColor='white'>
        <HStack spacing={4}>
          <Link href='/'>SkyPirateDB</Link>
          {current_user &&
            <Link href='/my/decks' >My Decks</Link>}
          <Link href='/decks'>Decklists</Link>
          <Link href='/cards'>Cards</Link>
        </HStack>
        <Spacer />
        <HStack>
          <ColorModeToggle />
          <UserToggle current_user={current_user} />
        </HStack>
      </Flex>
      <Container maxW='container.lg' pt={4} marginBlockEnd={14} {...props}>
        {children}
      </Container>
      <Footer />
    </Flex>
  </ChakraProvider>
)