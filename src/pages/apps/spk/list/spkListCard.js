// ** React Imports
import { useState } from 'react'
// import
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'

import { Paginate } from 'src/utils/Paginate'
import moment from 'moment'
import Link from 'next/link'

import TablePagination from '@mui/material/TablePagination'

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const statusColors = {
  1: 'warning',
  3: 'success',
  7: 'secondary',
  9: 'primary',
  13: 'error'
}

const Paragraph = styled('p')(({ theme }) => ({
  marginBottom: theme.spacing('0.5px')
}))

const SpkListCard = ({ allSpkHd, totalSpk }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const allData = Paginate(allSpkHd, currentPage, pageSize)
  return (
    <>
      <Grid container spacing={2}>
        {allData.map(spk => (
          <Grid item key={spk.spk_id} xs={12} sm={3}>
            <Card
              sx={{
                marginTop: '10px',
                size: 'small',
                display: 'flex',
                flexDirection: 'column',
                height: '250px',
                width: '100%'
              }}
            >
              <CardContent
                sx={{
                  pt: 0,
                  pl: 0,
                  mb: 5,
                  mr: 5,
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'column',
                  fontSize: '0.8rem'
                }}
              >
                <Box sx={{ display: 'flex', position: 'relative', size: '100%' }}>
                  <CustomChip
                    skin='light'
                    color={statusColors[spk.status]}
                    size='small'
                    label={
                      <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.8rem', color: 'text.primary' }}>
                        {spk.spk_id}
                      </Typography>
                    }
                    sx={{ borderRadius: '4px' }}
                  />
                </Box>

                <Box sx={{ display: 'flex', width: '100%', pt: 2, ml: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.85rem', color: 'text.primary' }}>
                    Customer :
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', pt: 0, ml: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.85rem', color: 'text.primary' }}>
                    {spk.cust_name}
                  </Typography>
                </Box>

                {spk.cust_cd !== spk.debtor_acct ? (
                  <>
                    <Box sx={{ display: 'flex', width: '100%', pt: 2, ml: 2 }}>
                      <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.85rem', color: 'text.primary' }}>
                        Dipesan Untuk :
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', width: '100%', pt: 0, ml: 2 }}>
                      <Typography
                        variant='subtitle2'
                        sx={{ mr: 2, fontSize: '0.85rem', fontWeight: 'bold', color: 'text.primary' }}
                      >
                        {spk.debtor_name.substring(0, 31)}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <p />
                )}
                <Divider sx={{ mt: '0.75px' }} />
                <Box sx={{ display: 'flex', width: '100%', ml: 2, pt: 0 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
                    Tgl.SPK : {moment(spk.spk_date).format('DD MMM YYYY')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', ml: 2, pt: 0 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '0.75rem', color: 'text.primary' }}>
                    Jumlah Pesanan : {spk.item_count} produk
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', pt: 0, ml: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
                    Harus selesai pada : {moment(spk.expected_date).format('DD MMM YYYY')}
                  </Typography>
                </Box>

                <CardActions className='card-action-dense'>
                  <Grid container spacing={2} justifyContent='space-between'>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', width: '100%', position: 'absolute', pt: 4 }}>
                        <Link href={`/apps/spk/view/${encodeURIComponent(spk.spk_id)}`}>
                          <Button>Lihat Detail</Button>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[12, 25, 100]}
        component='div'
        count={totalSpk} // jumlah total postingan
        page={currentPage - 1} // jumlah postingan per halaman
        onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
        rowsPerPage={12}
        onRowsPerPageChange={e => setPageSize(parseInt(e.target.value, 12))}
      />
    </>
  )
}

export default SpkListCard
