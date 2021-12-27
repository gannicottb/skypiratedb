import { Icon, Text, Code, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, useDisclosure, VStack, Grid, GridItem, Divider } from "@chakra-ui/react"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
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
      <Icon
        aria-label="Help"
        icon={<FontAwesomeIcon icon={faQuestionCircle} />}
        ref={btnRef} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Syntax Help</DrawerHeader>
          <DrawerBody>
            <Text>Searching any string will try to find a card with that name.</Text>
            <Text>You can also find cards by using keywords.</Text>
            <Text>The format is <Code>keyword:term</Code>.</Text>
            <Text>For example, to find all Assets, you could type <Code>t:asset</Code></Text>
            <Text>You can combine expressions as well, like <Code>t:crew a:3</Code> to find all crew with 3 attack.</Text>
            <Text>Currently multi-expression searches are evaluated with AND.</Text>
            <Text>The list of all supported keywords are below.</Text>
            <Divider />
            <Grid templateColumns='repeat(2, 1fr)' gap={2}>
              {keywordHelp.map(k => <GridItem key={k.kw}><Code>{k.kw}:{k.desc}</Code></GridItem>)}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}