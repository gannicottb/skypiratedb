import { Box, Popover, PopoverProps, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from "@chakra-ui/react"
import * as React from "react"
import { Card } from "../Card"

interface WithPopoverProps extends PopoverProps {
  card: Card
  children: any
  onClick?: any
}
export const WithPopover = ({ card, children, onClick, ...props }: WithPopoverProps) => {

  return (
    <Popover isLazy trigger='hover' placement='auto' {...props}>
      <PopoverTrigger>
        {React.cloneElement(React.Children.only(children), { onClick: onClick })}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Card card={card} displayMode="text"></Card>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}