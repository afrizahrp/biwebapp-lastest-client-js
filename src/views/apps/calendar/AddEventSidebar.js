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

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import PlanDialog from './PlanDialog'

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
    spk_id,
    startDate,
    endDate,
    calendarsColor
  } = props

  // ** States
  const [error, setError] = useState(false)
  const [openPlanDialog, setOpenPlanDialog] = useState(false)
  const [values, setValues] = useState(defaultState)
  const [detailData, setdetailData] = useState(null)
  const [itemDescs, setItemDescs] = useState([])
  const [selectedSpk, setSelectedSpk] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [spkQty, setSpkQty] = useState(0)

  const encodedSpkId = encodeURIComponent(spk_id)

  const handleClickEdit = (Item_cd, item_descs, spkQty) => () => {
    setSelectedItem(Item_cd)
    setSelectedSpk(spk_id)
    setItemDescs(item_descs)
    setSpkQty(spkQty)
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
        calendar: 'Warning', //capitalize(values.calendar),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
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

  // const onSubmit = data => {
  //   const updatedEvent = {
  //     title: data.title,
  //     start: data.startDate,
  //     end: data.endDate,
  //     calendar: 'Warning'
  //   }

  //   axios
  //     .patch(`${process.env.NEXT_PUBLIC_API_URL}/events/${store.selectedEvent.id}`, updatedEvent)
  //     .then(response => {
  //       // handle successful response
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       // handle error
  //       console.error(error)
  //     })
  // }

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
        eventId: event.eventId || '',
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
    if (store.selectedEvent !== null && store.selectedEvent.title.length) {
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
              <Box sx={{ mb: 5 }}>
                {/* <FormControl fullWidth sx={{ mb: 2 }}>
                  <Typography variant='subtitle2' sx={{ mr: 0, color: 'text.primary', fontSize: '0.85rem' }}>
                    Customer :{' '}
                    {store.selectedEvent !== null && store.selectedEvent.title.length
                      ? store.selectedEvent.extendedProps.cust_name
                      : null}
                  </Typography>
                </FormControl> */}

                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='cust_name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        label='Customer'
                        value={value}
                        disabled
                        onChange={onChange}
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                  {/* {errors.eventId && (
                    <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                      This field is required
                    </FormHelperText>
                  )} */}
                </FormControl>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 5, width: '180px' }}>
                    <DatePicker
                      selectsStart
                      id='event-start-date'
                      endDate={values.endDate}
                      selected={values.startDate}
                      startDate={values.startDate}
                      showTimeSelect={!values.allDay}
                      dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                      customInput={<PickersComponent label='Start Date (SPK Date)' registername='startDate' />}
                      onChange={date => setValues({ ...values, startDate: new Date(date) })}
                      onSelect={handleStartDate}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 5, width: '180px' }}>
                    <DatePicker
                      selectsEnd
                      id='event-end-date'
                      endDate={values.endDate}
                      selected={values.endDate}
                      minDate={values.startDate}
                      startDate={values.startDate}
                      showTimeSelect={!values.allDay}
                      dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                      customInput={<PickersComponent label='End Date (Expected Date)' registername='endDate' />}
                      onChange={date => setValues({ ...values, endDate: new Date(date) })}
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* </FormControl> */}
              <Grid container spacing={3}>
                {detailData &&
                  detailData.map(spkdt => (
                    <Grid item key={spkdt.catalog_no} xs={6} sm={6} lg={8}>
                      <Card sx={{ width: 400 }}>
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
                            <Box sx={{ ml: 2 }}>
                              <Typography variant='body1' sx={{ mr: 2, color: 'text.primary', fontSize: '0.85rem' }}>
                                {spkdt.Item_cd} | {spkdt.catalog_no}
                              </Typography>

                              <Typography
                                variant='body1'
                                sx={{ mr: 5, color: 'text.primary', fontSize: '0.90rem', strong: 'bold' }}
                              >
                                {spkdt.item_descs}
                              </Typography>

                              <Typography variant='body1' sx={{ mr: 5, color: 'text.primary', fontSize: '0.85rem' }}>
                                Qty : {spkdt.spk_qty}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                              <Button
                                variant='outlined'
                                size='small'
                                onClick={handleClickEdit(spkdt.Item_cd, spkdt.item_descs, spkdt.spk_qty)}
                              >
                                Setup Plan
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <Box sx={{ mt: 10, display: 'flex', alignItems: 'center' }}>
                <RenderSidebarFooter />
              </Box>
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
          spk_id={spk_id}
          item_descs={itemDescs}
          spkQty={spkQty}
          selectedItem={selectedItem}
          startDate={store.selectedEvent.start}
          endDate={store.selectedEvent.end}
        />
      )}
    </>
  )
}

export default AddEventSidebar
