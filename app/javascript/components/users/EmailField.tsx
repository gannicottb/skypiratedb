import { FormControl, FormLabel, Input, InputProps, useMergeRefs } from "@chakra-ui/react"
import * as React from "react"

export const EmailField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const mergeRef = useMergeRefs(inputRef, ref)
  return (
    <FormControl id="email">
      <FormLabel>Email address</FormLabel>
      <Input ref={mergeRef} name="email" type="email" autoComplete="email" required {...props} />
    </FormControl>
  )
})