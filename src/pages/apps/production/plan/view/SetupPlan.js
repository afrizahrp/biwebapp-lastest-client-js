// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTaskBySpkAndItemCd } from 'src/store/apps/production/plan/planDetail'

import { getSpkDetailBySpkId } from 'src/store/apps/spk/spkDt'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'

import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import moment from 'moment'
import 'moment/locale/id' // Import the Indonesian locale

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

import TaskStepper from 'src/pages/apps/production/plan/view/TaskStepper'

const defaultState = {
  url: '',
  title: '',
  cust_name: '',
  endDate: new Date(),
  startDate: new Date()
}

const SetupPlan = props => {
  // ** Props
  const { open, toggle, drawerWidth, spk_id, cust_name, onClose, startDate, endDate, item_count } = props

  const [error, setError] = useState(false)
  const [openTaskDialog, setOpenTaskDialog] = useState(false)
  const [collapse, setCollapse] = useState(false)

  const [showStepper, setShowStepper] = useState(false)
  const [openStepper, setOpenStepper] = useState(false)
  const [values, setValues] = useState(defaultState)
  const [detailData, setdetailData] = useState(null)
  const [itemDescs, setItemDescs] = useState([])
  const [selectedSpk, setSelectedSpk] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [spkQty, setSpkQty] = useState(0)

  const encodedSpkId = encodeURIComponent(spk_id)

  const { oneSpkDt } = useSelector(state => state.spkDetail)

  const [collapseStates, setCollapseStates] = useState(Array(oneSpkDt.length).fill(false))

  const dispatch = useDispatch()

  const {
    clearErrors,
    formState: { errors }
  } = useForm({ defaultValues: { title: '', cust_name: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    setOpenStepper(false)
    setSelectedSpk(null)
    setSelectedItem(null)
    clearErrors()
    toggle()
  }

  useEffect(() => {
    dispatch(getSpkDetailBySpkId(encodedSpkId))
  }, [dispatch, encodedSpkId])

  const handleClick = (encodedSpkId, Item_cd, index) => {
    const newCollapseStates = [...collapseStates]
    newCollapseStates[index] = !newCollapseStates[index]
    setCollapseStates(newCollapseStates)
    setSelectedSpk(encodedSpkId)
    setSelectedItem(Item_cd)
    setCollapse(true)

    dispatch(getTaskBySpkAndItemCd({ spk_id: encodedSpkId, item_cd: Item_cd }))
  }

  return (
    <>
      <Drawer
        anchor='left'
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: ['450px', drawerWidth],

            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box
          className='sidebar-header'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'background.default',
            p: theme => theme.spacing(3, 3.255, 3, 5.255)
          }}
        >
          <Typography variant='h6'>{spk_id}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          </Box>
        </Box>
        <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
          <Box sx={{ mb: 5 }}>
            <Typography variant='h6' sx={{ mb: 2, color: 'text.primary', fontSize: '0.85rem' }}>
              {cust_name}
            </Typography>
            <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary', fontSize: '1rem' }}>
              Tgl SPK : {moment(startDate).locale('id').format('DD MMM yyyy')}
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ mr: 2, color: 'text.primary', fontSize: '1rem', fontStyle: 'strong' }}
            >
              Harus selesai pada : {moment(endDate).locale('id').format('DD MMM yyyy')}
            </Typography>
            {/* <Link href={`/apps/production/plan/view/${encodedSpkId}`}>
              <Button>View All Scheduled Assignments</Button>
            </Link> */}

            <Box sx={{ display: 'flex', width: '100%', pt: 0 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, fontSize: '1rem', color: 'text.primary' }}>
                Jumlah Pesanan : {item_count} produk
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {oneSpkDt &&
              oneSpkDt.map((spkdt, index) => (
                <Grid item key={spkdt.catalog_no} xs={6} sm={6} lg={8}>
                  <Card sx={{ width: 475 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center', // Align items vertically
                          width: '100%',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box>
                          <Typography variant='body1' sx={{ color: 'text.primary', fontSize: '0.75rem' }}>
                            Kode dan Katalog Produk : {spkdt.Item_cd} - {spkdt.catalog_no}
                          </Typography>

                          <Typography
                            variant='body1'
                            sx={{ color: 'text.primary', fontSize: '0.90rem', strong: 'bold' }}
                          >
                            Nama Produk : {spkdt.item_descs}
                          </Typography>

                          <Typography variant='body1' sx={{ color: 'text.primary', fontSize: '0.80rem' }}>
                            Jumlah Pesanan : {spkdt.spk_qty} unit
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions className='card-action-dense'>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        {/* {checkPlandate(spkdt.spk_id, spkdt.Item_cd) ? ( */}
                        <Button
                          onClick={() => {
                            setCollapse(!collapse)
                            setShowStepper(!showStepper)
                            handleClick(encodedSpkId, spkdt.Item_cd, index)
                          }}
                        >
                          Atur Jadwal
                        </Button>
                        {/* ) : null} */}

                        <IconButton
                          size='small'
                          onClick={() => {
                            setShowStepper(!showStepper)

                            handleClick(encodedSpkId, spkdt.Item_cd, index)
                          }}
                        >
                          <Icon
                            fontSize='1.875rem'
                            icon={collapseStates[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                          />
                        </IconButton>
                      </Box>
                    </CardActions>
                    <Collapse in={collapseStates[index]}>
                      <Divider sx={{ m: '0 !important' }} />
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <CardContent>
                            <Box>
                              <TaskStepper
                                open={collapse}
                                spk_id={encodedSpkId}
                                item_cd={selectedItem}
                                onClose={() => {
                                  setOpenStepper(false)
                                  setSelectedSpk(null)
                                  setSelectedItem(null)
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
          {/* </form> */}
        </Box>
      </Drawer>
      {selectedItem && <TaskStepper open={openStepper} spk_id={selectedSpk} Item_cd={selectedItem} />}
    </>
  )
}

export default SetupPlan
