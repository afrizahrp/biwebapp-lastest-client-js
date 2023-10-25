import axios from 'axios'
import { useState, useEffect, useCallback, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Avatar from '@mui/material/Avatar'
import { blue } from '@mui/material/colors'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

import { fetchProductById } from 'src/store/apps/product'

const PlanDialog = ({ open, onClose, spk_id, selectedItem, item_descs, spkQty, startDate, endDate }) => {
  const encodedSpkId = encodeURIComponent(spk_id)
  const [plandt, setPlandt] = useState([])
  const [error, setError] = useState(false)
  // const { item_descs } = useSelector(store => store.product)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchProductById(selectedItem))
  // }, [dispatch, selectedItem])

  const defaultState = {
    url: '',
    title: '',
    guests: [],
    allDay: true,
    description: '',
    endDate: new Date(),
    calendar: 'Business',
    startDate: new Date()
  }

  const [values, setValues] = useState(defaultState)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const onSubmit = data => {
    console.log(data)
  }

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

  useEffect(() => {
    axios

      .get(`${process.env.NEXT_PUBLIC_API_URL}/pdplanactivitydt/${encodedSpkId}/${selectedItem}`)
      .then(response => {
        setPlandt(response.data)
        setError(false)
      })
      .catch(() => {
        setPlandt(null)
        setError(true)
      })
  }, [encodedSpkId, selectedItem])

  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1200 } }}>
      <DialogTitle>
        Setup Plan for : {item_descs}, Spk Qty : {spkQty}{' '}
      </DialogTitle>
      <Grid container spacing={2}>
        {plandt &&
          plandt.map(plan => (
            <Grid item key={plan.selectedItem} xs={12} sm={4}>
              <DialogContent>
                <Card sx={{ width: '800px' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: blue[700], color: 'white' }} aria-label='recipe'>
                        {plan.taskId}
                      </Avatar>
                    }
                    title={plan.taskName}
                  />
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                          <DatePickerWrapper>
                            <Box>
                              <DatePicker
                                selectsStart
                                id='event-start-date'
                                endDate={endDate}
                                selected={startDate}
                                startDate={startDate}
                                dateFormat={'dd-MM-yyyy'}
                                customInput={<PickersComponent label='Start Date' registername='startDate' />}
                              />
                            </Box>
                          </DatePickerWrapper>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DatePickerWrapper>
                            <Box>
                              <DatePicker
                                selectsEnd
                                id='event-end-date'
                                endDate={endDate}
                                selected={endDate}
                                minDate={startDate}
                                startDate={startDate}
                                // dateFormat={'yyyy-MM-dd'}
                                dateFormat={'dd-MM-yyyy'}
                                customInput={<PickersComponent label='End Date' registername='endDate' />}
                              />
                            </Box>
                          </DatePickerWrapper>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </DialogContent>
            </Grid>
          ))}
      </Grid>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={() => console.log('Save button clicked')}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

PlanDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pdplanactivitydt: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired
}

export default PlanDialog
