import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  useDisclosure,
  useMergeRefs,
  useColorModeValue as mode,
  InputRightAddon,
} from '@chakra-ui/react'
import * as React from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface PasswordFieldProps extends InputProps {
  label?: string
}
export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current
    if (input) {
      input.focus({ preventScroll: true })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    <FormControl id={props.id || "password"}>
      <Flex justify="space-between">
        <FormLabel>{props.label || 'Password'}</FormLabel>
      </Flex>
      <InputGroup>
        <Input
          ref={mergeRef}
          name="password"
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          required
          {...props}
        />
        <InputRightAddon>
          <IconButton
            tabIndex={-1}
            bg="transparent !important"
            variant="ghost"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            onClick={onClickReveal}
          />
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  )
})

PasswordField.displayName = 'PasswordField'