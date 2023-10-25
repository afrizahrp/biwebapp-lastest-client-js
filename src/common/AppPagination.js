import { useState , useEffect} from 'react'
import _ from 'lodash'
import  Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const AppPagination = props => {
  const { itemsCount, pageSize,onPageChange } = props
  const [currentPage, setCurrentPage] = useState(1)
  const pagesCount = Math.ceil(itemsCount / pageSize)

  useEffect(() => {
    setCurrentPage(1) // Set currentPage to 1 only on initial render
  }, [])


  const handlePageChange = (event,page) => {
    setCurrentPage(page)
    onPageChange(page)
  }


  if (pagesCount === 1) return null
  // const pages = _.range(1, pagesCount + 1)

  return (

    <Stack spacing={2}>
      <Pagination color='primary' count={pagesCount} page = {currentPage} onChange={handlePageChange} />
    </Stack>

    // <nav>
    //   <ul className='pagination'>
    //     {pages.map(page => (
    //       <li key={page} className={page===currentPage ? 'page-item-active':'page-item'}>
    //         <a className='page-link' onClick={()=>onPageChange(page)}>{page}</a>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
  )
}

export default AppPagination
