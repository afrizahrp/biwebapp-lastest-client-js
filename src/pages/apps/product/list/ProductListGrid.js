// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import TableHeader from 'src/common/TableHeader'

import FormRowSelectNew from 'src/utils/FormRowSelectNew'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from 'src/store/apps/product'

// ** Actions Imports
import { getAllProduct, setClearValue } from 'src/store/apps/product'

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.85rem',
  color: 'blue',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const columns = [
  {
    flex: 0.08,
    field: 'item_cd',
    minWidth: 80,
    headerName: 'Item Code',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap variant='body2'>
              {row.item_cd}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.07,
    field: 'catalog_no',
    minWidth: 60,
    headerName: 'Catalog No',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap variant='body2'>
              {row.catalog_no}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.265,
    minWidth: 250,
    field: 'item_descs',
    headerName: 'Description',
    renderCell: ({ row }) => {
      const { item_descs, item_cd } = row
      const encodedItemCd = encodeURIComponent(item_cd)
      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Typography noWrap variant='body2' sx={{ color: 'blue' }}>
            <StyledLink href={`/apps/product/view/${item_cd}`}>
              {item_descs
                .split('/')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('/')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </StyledLink>
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 80,
    field: 'uom_cd',
    headerName: 'Uom Code',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' sx={{ alignItems: 'center', display: 'flex' }}>
          {row.uom_cd}
        </Typography>
      )
    }
  },

  {
    flex: 0.07,
    minWidth: 100,
    headerName: 'Category',
    field: 'group_descs',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.group_descs}
        </Typography>
      )
    }
  }
]

const ProductList = () => {
  // ** State
  const [group_descs, setGroup_descs] = useState('')
  const [value, setValue] = useState('')

  const [page, setPage] = useState(1)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [localSearch, setLocalSearch] = useState('')
  const searchTerm = useSelector(state => state.product.params.searchQuery)
  const allGroupProduct = useSelector(state => state.groupProduct.data)

  const store = useSelector(state => state.product)
  const rows = store.data

  const totalRows = store.totalRows
  const totalPages = store.totalPages
  const isLoading = store.loading

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProduct({ group_descs, searchQuery: searchTerm }))
  }, [dispatch, group_descs, searchTerm])

  const handleClickRefresh = () => {
    dispatch(setClearValue())
    setLocalSearch('')
  }

  const handlePageChange = params => {
    const newPage = params.page + 1 // Karena parameter 'page' dimulai dari 0, tambahkan 1 untuk mendapatkan halaman yang benar
    setPage(newPage)
    setCurrentPage(newPage)
    // Jika diperlukan, perbarui nilai currentPage
  }

  const handlePageSizeChange = event => {
    const newPageSize = parseInt(event.target.value, 10)
    setPageSize(newPageSize)
    setPerPage(newPageSize) // Perbarui nilai perPage juga
    setPage(1) // Atur halaman kembali ke halaman 1
  }

  const handleSearchChange = e => {
    dispatch(setSearchQuery({ name: 'searchQuery', value: e.target.value }))
  }

  const handleSearch = e => {
    setLocalSearch(e.target.value)
    handleSearchChange({ name: e.target.name, value: e.target.value })
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleGroupChange = useCallback(e => {
    setGroup_descs(e.target.value)
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: '10px', marginTop: -5 }}>
          <CardHeader
            title='Search and Filters'
            fontSize={9}
            sx={{ pb: 1, pt: 1, position: 'sticky', '& .MuiCardHeader-subheader': { letterSpacing: '.15px' } }}
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item sm={7} xs={12}>
                <TableHeader
                  handleFilter={handleSearchChange}
                  value={searchTerm}
                  placeholder='Search by description or catalog no'
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormRowSelectNew
                  id='select-category'
                  label='Select Category'
                  labelId='category-select'
                  name='searchGroupDescs'
                  labelText='Select Category'
                  handleChange={handleGroupChange}
                  inputProps={{ placeholder: 'All Category' }}
                  value={group_descs}
                  // list={['All Category', ...allGroupProduct.map(group => group.group_descs)]}

                  list={[
                    'All Category',
                    ...allGroupProduct.map(group =>
                      group.group_descs
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                    )
                  ]}
                />
              </Grid>
              <Grid item xs='auto'>
                <Box sx={{ mt: 1, pt: 1 }}>
                  <Button variant='contained' size='large' onClick={handleClickRefresh}>
                    Refresh
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={45}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={r => r.item_cd}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </>
  )
}

export default ProductList
