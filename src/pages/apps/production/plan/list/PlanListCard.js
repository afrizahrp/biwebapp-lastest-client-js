// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'

import { Paginate } from 'src/utils/Paginate'
import moment from 'moment'
import Link from 'next/link'

import TablePagination from '@mui/material/TablePagination'

import SetupPlan from 'src/pages/apps/production/plan/view/SetupPlan'
import { getAllPlanHd } from 'src/store/apps/production/plan/planHeader'

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

const PlanListCard = ({ allSpkHd, totalSpk }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const [selectedSpk, setSelectedSpk] = useState(null)
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [selectedCustName, setSelectedCustName] = useState(null)
  const [selectedItemCount, setSelectedItemCount] = useState(0)

  const [setupOpenPlan, setSetupOpenPlan] = useState(false)

  const planHeader = useSelector(state => state.planHeader)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPlanHd())
  }, [])

  const toggleSetupPlanDrawer = () => {
    setSetupOpenPlan(!setupOpenPlan)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handleClickSetPlan = (spk_id, cust_name, spk_date, expected_date, item_count) => {
    setSelectedSpk(spk_id)
    setSelectedCustName(cust_name)
    setSelectedStartDate(spk_date)
    setSelectedEndDate(expected_date)
    setSelectedItemCount(item_count)
    setSetupOpenPlan(true)
    toggleSetupPlanDrawer()
  }

  const allData = Paginate(allSpkHd, currentPage, pageSize)
  return (
    <>
      <TablePagination
        rowsPerPageOptions={[12, 25, 100]}
        component='div'
        count={totalSpk} // jumlah total postingan
        page={currentPage - 1} // jumlah postingan per halaman
        onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
        rowsPerPage={12}
        onRowsPerPageChange={e => setPageSize(parseInt(e.target.value, 12))}
      />
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
                </Box>{' '}
                <Box sx={{ display: 'flex', width: '100%', pt: 0, ml: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '0.75rem' }}>
                    Harus selesai pada : {moment(spk.expected_date).format('DD MMM YYYY')}
                  </Typography>
                </Box>
                <Grid container spacing={2} justifyContent='space-between'>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', width: '100%', ml: 2, mt: 4 }}>
                      <Button
                        varian='contained'
                        size='small'
                        onClick={() =>
                          handleClickSetPlan(spk.spk_id, spk.cust_name, spk.spk_date, spk.expected_date, spk.item_count)
                        }
                      >
                        {/* <Typography variant='title2' sx={{ mr: 2, fontSize: '0.75rem', color: 'blue' }}> */}
                        Atur Jadwal
                        {/* </Typography> */}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
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
      <SetupPlan
        open={setupOpenPlan}
        toggle={toggleSetupPlanDrawer}
        drawerWidth='530px'
        spk_id={selectedSpk}
        cust_name={selectedCustName}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        item_count={selectedItemCount}
        onClose={() => {
          setSetupOpenPlan(false)
        }}
      />
    </>
  )
}

export default PlanListCard
