import * as React from 'react'
import { Card } from './Card'
import { Container, ChakraProvider } from '@chakra-ui/react'

// type CardBrowserProps = {
//   children?:
//   | React.ReactChild
//   | React.ReactChild[];
// }
// export default ({ children }: CardBrowserProps) => (
//   <ChakraProvider>
//     <Container>
//       {children}
//     </Container>
//   </ChakraProvider>
// )
type CardBrowserProps = {
  cards: Card[]
}

export default ({ cards }: CardBrowserProps) => (
  <ChakraProvider>
    <Container>
      {cards.map((c) =>
        <Card
          card={c}
        />)
      }
    </Container>
  </ChakraProvider>
)