import { Text, Code, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure, VStack, Grid, GridItem, Divider } from "@chakra-ui/react"
import { faBolt, faDharmachakra, faDotCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"

type QuerySyntaxHelpProps = {
  keywordHelp: { kw: string, desc: string }[]
}
export default ({ keywordHelp }: QuerySyntaxHelpProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <IconButton
        aria-label="Help"
        icon={<FontAwesomeIcon icon={faQuestionCircle} />}
        ref={btnRef} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Syntax Help</DrawerHeader>
          <DrawerBody>
            <VStack alignItems='flex-start'>
              <Text>Searching any string will try to find a card with that name.</Text>
              <Text>You can also find cards by using keywords.</Text>
              <Text>The format is <Code>keyword:term</Code>. Surround your term with quotes if it contains spaces.</Text>
              <Text>You can combine expressions as well, like <Code>t:crew a:3</Code> to find all crew with 3 attack.</Text>
              <Text>Currently multi-expression searches are evaluated with AND.</Text>
              <Text>The list of all supported keywords are below.</Text>
              <Divider />
              <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                {keywordHelp.map(k => <GridItem key={k.kw}><Code>{k.kw}:{k.desc}</Code></GridItem>)}
              </Grid>
              <Divider />
              <Text>To search for glyphs, use these codes with an <Code>x</Code> expression:</Text>
              <Text><Code>(A)</Code> = <FontAwesomeIcon icon={faDharmachakra} /></Text>
              <Text><Code>(P)</Code> = <FontAwesomeIcon icon={faDotCircle} /></Text>
              <Text><Code>(T)</Code> = <FontAwesomeIcon icon={faBolt} /></Text>
              <Divider />
              <Text>More examples:</Text>
              <Text><Code>e:core</Code> and <Code>e:awakening</Code> return all cards from the Core set and Awakening, respectively.</Text>
              <Text><Code>sup:Tactic f:pirate</Code> returns all Pirate cards with the Tactic supertype</Text>
              <Text><Code>x:gain x:(P) t:crew</Code> returns all crew that have the text "gain" and the powder glyph.</Text>
              <Text><Code>x:"whenever you are dealt" s:structure</Code> returns all structures that trigger when you are dealt damage.</Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}