import * as React from 'react'
import { Container, Link, Wrap, ChakraProvider, Box } from '@chakra-ui/react'

const HeaderItem = ({ children }) => (
  <Box
    _hover={{
      background: "white",
      color: "teal.500",
    }}>
    {children}
  </Box>
)

export default ({ children }) => (
  <ChakraProvider>
    <Wrap bg='darkslateblue' w='100%' p={4} spacing='4' color='white'>
      <HeaderItem><Link href='/'>SkyPirateDB</Link></HeaderItem>
      <HeaderItem><Link href='/cards'>Cards</Link></HeaderItem>
    </Wrap>
    <Container maxW='container.lg'>
      {children}
    </Container>
  </ChakraProvider >
)