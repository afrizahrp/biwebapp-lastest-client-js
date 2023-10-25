// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import moment from 'moment'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Store Imports

// ** Actions Imports

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
    flex: 0.07,
    field: 'spk_date',
    minWidth: 70,
    headerName: 'Spk Date',
    renderCell: ({ row }) => {
      let spkDate = moment(row.spk_date)
      spkDate = spkDate.format('DD MMM YYYY')
      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap variant='body2'>
              {spkDate}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'spk_id',
    minWidth: 60,
    headerName: 'Spk Id',
    renderCell: ({ row }) => {
      const { cust_name, spk_id } = row
      const encodedSpkId = encodeURIComponent(row.spk_id)

      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap variant='body2'>
              <StyledLink href={`/apps/spk/view/${encodedSpkId}`}>{row.spk_id}</StyledLink>
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.265,
    minWidth: 250,
    field: 'cust_name',
    headerName: 'Customer Name',
    renderCell: ({ row }) => {
      const { cust_name, spk_id } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Typography noWrap variant='body2'>
            {cust_name
              .split('/')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join('/')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 80,
    field: 'item_count',
    headerName: 'Item Qty',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' sx={{ alignItems: 'center', display: 'flex' }}>
          {row.item_count} item{row.item_count > 1 && 's'}
        </Typography>
      )
    }
  },
  {
    flex: 0.07,
    minWidth: 100,
    headerName: 'Expected',
    field: 'expected_date',
    renderCell: ({ row }) => {
      let expectedDate = moment(row.expected_date)
      expectedDate = expectedDate.format('DD MMM YYYY')
      return (
        <Typography variant='body2' noWrap sx={{ textTransform: 'capitalize' }}>
          {expectedDate}
        </Typography>
      )
    }
  },

  {
    flex: 0.07,
    minWidth: 100,
    headerName: 'Status',
    field: 'status_name',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.status_name}
        </Typography>
      )
    }
  }
]

const SpkListGrid = ({ allSpkHd }) => {
  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={45}
            rows={allSpkHd}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={r => r.spk_id}
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

export default SpkListGrid
