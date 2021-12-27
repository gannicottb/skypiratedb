import { HStack, IconButton, Text } from '@chakra-ui/react'
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
      <IconButton
        aria-label="Previous"
        icon={<FontAwesomeIcon icon={faAngleLeft} />}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      />
      <Text>{currentPage}</Text>
      <IconButton
        aria-label="Next"
        icon={<FontAwesomeIcon icon={faAngleRight} />}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      />
      <IconButton
        aria-label="Last"
        icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
        onClick={() => setCurrentPage(totalPages)}
      />
    </HStack>
  )
}
