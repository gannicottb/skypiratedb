Requirements

In View
-------

Display:
`1x CardName`
OR
`[Emplacement name with image background]`

Hover:
`(Small) Popover showing text`

Click:
`Go to card page`


In Editor
---------

Display:
`1x CardName`
OR
`[Emplacement name with image background]`

Hover: 
`(Small) Popover showing text`

Click:
`Modal with qty selector`


So they're the same, we just want different onClick?


  <Box>
    <Popover>
      {qty}x
      <PopoverTrigger>
        <CustomContent>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Card />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>


  <CustomContent> could be

  <Link toCardPage>cardName</Link><SplashIcon>

  or

  <Link onClick={openModal}>cardName</Link><SplashIcon>
  ...
  <Modal>


  The different emplacement display has somehow become intensely complex.

  