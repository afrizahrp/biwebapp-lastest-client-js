import { useState, useEffect } from 'react'
import _ from 'lodash'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const AppPagination = props => {
  const { itemsCount, pageSize, onPageChange } = props
  const [currentPage, setCurrentPage] = useState(1)
  const pagesCount = Math.ceil(itemsCount / pageSize)

  useEffect(() => {
    setCurrentPage(1) // Set currentPage to 1 only on initial render
  }, [])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  if (pagesCount === 1) return null

  return (
    <Stack spacing={2}>
      <Pagination color='primary' count={pagesCount} page={currentPage} onChange={handlePageChange} />
    </Stack>
  )
}

export default AppPagination
