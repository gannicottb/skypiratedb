import * as React from 'react'
import { Box, ChakraProvider } from '@chakra-ui/react'

type AppProps = {
  greeting: string;
}
const HelloChakra = ({ greeting }: AppProps) => (
  <ChakraProvider>
    <Box bg='tomato' w='100%' p={4} color='white'>
      {greeting}
    </Box>
  </ChakraProvider>
)

export default HelloChakra