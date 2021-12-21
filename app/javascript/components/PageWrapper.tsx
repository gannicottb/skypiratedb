import * as React from 'react'
import {
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
  HStack,
  Link,
  Spacer,
  Switch,
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import theme from './theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack spacing={2}>
      <Switch onChange={toggleColorMode} />
      <FontAwesomeIcon icon={colorMode === 'light' ? faSun : faMoon} />
    </HStack>
  )
}

export default ({ children }) => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Flex bg='darkslateblue' w='100%' p={4} textColor='white'>
      <HStack spacing={4}>
        <Link href='/'>SkyPirateDB</Link>
        <Link href='/cards'>Cards</Link>
      </HStack>
      <Spacer />
      <ColorModeToggle />
    </Flex>
    <Container maxW='container.lg' pt={4}>
      {children}
    </Container>
  </ChakraProvider>
)