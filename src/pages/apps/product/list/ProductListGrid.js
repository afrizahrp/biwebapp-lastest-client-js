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

      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Typography noWrap variant='body2' sx={{ color: 'blue' }}>
            <StyledLink href={`/apps/product/view/${item_cd}`}>
              {row.item_descs
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

const ProductListGrid = ({ allProducts, totalProduct }) => {
  // ** State
  const [group_descs, setGroup_descs] = useState('')
  const [value, setValue] = useState('')

  const [page, setPage] = useState(1)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={45}
            rows={allProducts}
            rowCount={totalProduct}
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

export default ProductListGrid
