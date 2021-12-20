import * as React from 'react'
import { Link, Wrap, ChakraProvider } from '@chakra-ui/react'

export default ({ children }) => (
  <ChakraProvider>
    <Wrap bg='darkslateblue' w='100%' p={4} spacing='4' color='white'>
      <Link href='/'>SkyPirateDB</Link>
      <Link href='/cards'>Cards</Link>
    </Wrap>
    {children}
  </ChakraProvider >
)