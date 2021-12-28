import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

type PaginationBarProps = {
  totalItems: number,
  pageSize: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
export const PaginationBar = ({
  totalItems,
  pageSize,
  currentPage,
  setCurrentPage
}: PaginationBarProps) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <HStack>
      <IconButton
        aria-label="First"
        icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
        onClick={() => setCurrentPage(1)}
      />
      <Button
        aria-label="Previous"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      ><HStack>
          <FontAwesomeIcon icon={faAngleLeft} />
          <Text>Previous</Text>
        </HStack>
      </Button>
      <Button
        aria-label="Next"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      >
        <HStack>
          <Text>Next {pageSize}</Text>
          <FontAwesomeIcon icon={faAngleRight} />
        </HStack>
      </Button>
      <IconButton
        aria-label="Last"
        icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
        onClick={() => setCurrentPage(totalPages)}
      />
    </HStack>
  )
}
