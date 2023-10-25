// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'
import axios from 'axios'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from 'next/link'

import { styled } from '@mui/material/styles'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import PlanDialog from './PlanDialog'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { editProductImageUrl, fetchProductImageUrl } from 'src/store/apps/productImageUrl/index.js'

import { Image } from 'cloudinary-react'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useSelector } from 'react-redux'
const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const Paragraph = styled('p')(({ theme }) => ({
  marginBottom: theme.spacing(1)
}))

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

const defaultState = {
  url: '',
  title: '',
  cust_name: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Progress',
  startDate: new Date()
}

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle,
    handleViewDetail,
    spk_id
  } = props

  // ** States
  const [error, setError] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const [openPlanDialog, setOpenPlanDialog] = useState(false)

  const [values, setValues] = useState(defaultState)
  const [detailData, setdetailData] = useState(null)
  const [planDataDt, setPlanDataDt] = useState([])
  const [itemDescs, setItemDescs] = useState([])
  const pdplanactivitydt = useSelector(state => state.pdplanactivitydt)

  const [selectedItem, setSelectedItem] = useState(null)

  const [imgUrl1, setImgUrl1] = useState(null)
  const encodedSpkId = encodeURIComponent(spk_id)

  const handleSetPlanClick = () => {
    return <StyledLink href={`/apps/spk/view/${encodedSpkId}`}>Set Plan</StyledLink>
  }

  const handleClickEdit = () => {
    setOpenPlanDialog(true)
  }

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '', cust_name: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = data => {
    const modifiedEvent = {
      url: values.url,
      display: 'block',
      title: data.title,
      end: values.endDate,
      allDay: values.allDay,
      start: values.startDate,
      extendedProps: {
        calendar: capitalize(values.calendar),
        cust_name: values.cust_name,
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.cust_name.length ? values.cust_name : undefined
      }
    }
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValue('cust_name', event.cust_name || '')
      setValues({
        url: event.url || '',
        title: event.title || '',
        cust_name: event.cust_name || '',
        allDay: event.allDay,
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValue('cust_name', '')
    setValues(defaultState)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

  useEffect(() => {
    axios

      .get(`${process.env.NEXT_PUBLIC_API_URL}/icspkdt/${encodedSpkId}`)
      .then(response => {
        setdetailData(response.data)
        setError(false)
      })
      .catch(() => {
        setdetailData(null)
        setError(true)
      })
  }, [encodedSpkId])

  return (
    <>
      <Drawer
        anchor='left'
        open={addEventSidebarOpen}
        onClose={handleSidebarClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: ['600px', drawerWidth],

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
          <Typography variant='h6'>
            {store.selectedEvent !== null && store.selectedEvent.title.length ? store.selectedEvent.title : null}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          </Box>
        </Box>
        <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
          <DatePickerWrapper>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography variant='subtitle2' sx={{ mr: 0, color: 'text.primary', fontSize: '1rem' }}>
                  Customer :{' '}
                  {store.selectedEvent !== null && store.selectedEvent.title.length
                    ? store.selectedEvent.extendedProps.cust_name
                    : null}
                </Typography>

                <Typography variant='subtitle2' sx={{ mr: 0, color: 'text.primary', fontSize: '1rem' }}>
                  SPK Date :{' '}
                  {store.selectedEvent !== null && store.selectedEvent.title.length
                    ? store.selectedEvent.start.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : null}
                </Typography>

                <Typography variant='subtitle2' sx={{ mr: 0, color: 'text.primary', fontSize: '1rem' }}>
                  Expected Date :{' '}
                  {store.selectedEvent !== null && store.selectedEvent.title.length
                    ? store.selectedEvent.end.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : null}
                </Typography>
              </FormControl>
              <Grid container spacing={3}>
                {detailData &&
                  detailData.map(spkdt => (
                    <Grid item key={spkdt.catalog_no} xs={6} sm={6} lg={8}>
                      <Card sx={{ width: 550 }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center', // Align items vertically
                              width: '100%',
                              ml: 2,
                              pt: 2,
                              justifyContent: 'space-between'
                            }}
                          >
                            {/* <Box sx={{ display: 'flex', position: 'relative', size: '100%' }}>{renderUserAvatar()}</Box> */}

                            <Box sx={{ flex: '1' }}>
                              <Typography variant='body1' sx={{ mr: 2, color: 'text.primary', fontSize: '1rem' }}>
                                {spkdt.Item_cd} | {spkdt.catalog_no}
                              </Typography>
                              <Typography variant='h6' sx={{ mr: 5, color: 'text.primary', fontSize: '1rem' }}>
                                {spkdt.item_descs}
                              </Typography>

                              <Typography variant='body1' sx={{ mr: 5, color: 'text.primary', fontSize: '1rem' }}>
                                Qty : {spkdt.spk_qty}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                              {/* <StyledLink href={`/apps/product/view/${spkdt.Item_cd}`}> */}
                              <Button color='primary' size='small' variant='outlined' onClick={handleClickEdit}>
                                Set Plan
                              </Button>
                              {/* </StyledLink> */}
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </form>
          </DatePickerWrapper>
        </Box>
      </Drawer>
      {selectedItem && (
        <PlanDialog
          open={openPlanDialog}
          onClose={() => {
            setOpenPlanDialog(false)
            setSelectedItem(null)
          }}
          pdplanactivitydt={pdplanactivitydt}
          selectedItem={selectedItem}
        />
      )}
    </>
  )
}

export default AddEventSidebar
