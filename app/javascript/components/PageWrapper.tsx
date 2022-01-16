import * as React from 'react'
import {
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
    <Text>&copy; 2022 Winding Road Games. All rights reserved.</Text>
  </Box>
)

export default ({ children }) => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Flex direction='column' minHeight='100vh'>
      <Flex bg='darkslateblue' w='100%' p={4} textColor='white'>
        <HStack spacing={4}>
          <Link href='/'>SkyPirateDB</Link>
          <Link href='/cards'>Cards</Link>
        </HStack>
        <Spacer />
        <ColorModeToggle />
      </Flex>
      <Container maxW='container.lg' pt={4} marginBlockEnd={14}>
        {children}
      </Container>
      <Footer />
    </Flex>
  </ChakraProvider>
)