import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogActions, Button, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Avatar from '@mui/material/Avatar'
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types'

import PickersRange from 'src/common/PickersRange'
// import 'react-date-range/dist/styles.css' // main css file
// import 'react-date-range/dist/theme/default.css' // theme css file
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { useForm } from 'react-hook-form'
import { getTaskById, getTaskBySpkAndItemCd, updatePlanDetail } from 'src/store/apps/production/plan/planDetail'

import { getAllEmployee } from 'src/store/apps/hrd/employee'

import { toast } from 'react-hot-toast'

const TaskDialog = ({
  open,
  selectedId,
  spk_id,
  item_cd,
  taskId,
  taskName,
  planStartDate,
  planEndDate,
  assignedTo,
  remarks,
  item_descs,
  catalog_no,
  item_qty,
  onClose,
  isEdit
}) => {
  const { allEmployee } = useSelector(store => store.employee)

  const encodedSpkId = encodeURIComponent(spk_id)

  const [editedAssignedTo, setEditedAssignedTo] = useState(assignedTo)
  const [editedRemarks, setEditedRemarks] = useState(remarks)

  const [newPlanStartDate, setNewPlanStartDate] = useState(planStartDate)
  const [newPlanEndDate, setNewPlanEndDate] = useState(planEndDate)

  const handleUpdateDateRange = (startDate, endDate) => {
    setNewPlanStartDate(startDate)
    setNewPlanEndDate(endDate)
  }

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dialogClosed, setDialogClosed] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskById(selectedId))
  }, [dispatch, selectedId])

  useEffect(() => {
    dispatch(getAllEmployee())
  }, [dispatch])

  // const {
  //   control,
  //   formState: { errors }
  // } = useForm({ defaultValues: { assignedTo: '' } })

  const handleSubmit = e => {
    e.preventDefault()

    if (isEdit) {
      dispatch(
        updatePlanDetail({
          id: selectedId,
          productionPlanDt: {
            taskId,
            taskName,
            planStartDate: newPlanStartDate, //addDays(newPlanStartDate, 1),
            planEndDate: newPlanEndDate, //addDays(newPlanEndDate, 1),
            assignedTo: editedAssignedTo,
            remarks: editedRemarks
          }
        })
      ),
        toast.success(`Penugasan ${taskName} berhasil disimpan`)
    }
  }

  const handleClose = () => {
    dispatch(getTaskBySpkAndItemCd({ spk_id: encodedSpkId, item_cd }))
    setDialogClosed(true)
    onClose()
  }

  const handleEdit = e => {
    const name = e.target.name
    const value = e.target.value

    dispatch(handleChange({ name, value }))
  }

  const handleChange = e => {
    const selectedValue = e.target.value
    if (selectedValue === '') {
      setError(true)
    } else {
      setError(false)
      setEditedAssignedTo(selectedValue)
    }
  }

  useEffect(() => {
    const matchingEmployee = allEmployee.find(employee => employee.mainTask === taskId)

    if (matchingEmployee) {
      const assignedToValue = matchingEmployee.employeeName
      setEditedAssignedTo(assignedToValue)
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          width: 'auto',
          height: 'auto'
        }
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
              <Avatar sx={{ bgcolor: blue[700], size: 'small', color: 'white' }} aria-label='recipe'>
                {taskId}
              </Avatar>
              <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' fontSize='1rem'>
                  {taskName}
                </Typography>
                <Typography variant='title2' fontSize='0.7rem'>
                  {item_cd}|({catalog_no})
                </Typography>
                <Typography variant='title2' fontSize='0.8rem'>
                  {item_descs}, Qty: {item_qty} unit{item_qty > 1 && 's'}
                </Typography>
              </Box>
            </Box>

            <form className='formedittask' onSubmit={handleSubmit} autoComplete='off'>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <DatePickerWrapper>
                    <Box sx={{ mb: 5 }}>
                      <PickersRange
                        onUpdateDateRange={handleUpdateDateRange}
                        planStartDate={newPlanStartDate}
                        planEndDate={newPlanEndDate}
                      />
                    </Box>
                  </DatePickerWrapper>
                </Grid>
                <Grid item sm={6} xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box sx={{ mb: 5 }}>
                    <FormControl fullWidth>
                      <InputLabel id='assignedTo'>Pelaksana</InputLabel>
                      <Select
                        label='Pelaksana'
                        name='assignedTo'
                        value={editedAssignedTo}
                        labelId='assignedTo'
                        id='assignedTo'
                        onChange={e => setEditedAssignedTo(e.target.value)}
                      >
                        {allEmployee.map(employee => (
                          <MenuItem key={employee.employeeId} value={employee.employeeName}>
                            {employee.employeeName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name='remarks'
                    fullWidth
                    multiline
                    minRows={5}
                    value={editedRemarks}
                    onChange={e => setEditedRemarks(e.target.value)}
                    label='Isi keterangan disini'
                  />
                </Grid>

                <DialogActions>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'left', mb: 5 }}>
                      <Button
                        type='submit'
                        variant='contained'
                        onClick={() => {
                          handleSubmit
                        }}
                      >
                        Simpan
                      </Button>
                      <Box sx={{ ml: 2 }}>
                        <Button type='button' variant='outlined' onClick={handleClose}>
                          Tutup
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </DialogActions>
              </Grid>
            </form>
          </DialogContent>
        </Grid>
      </Grid>
    </Dialog>
  )
}

// TaskDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   selectedId: PropTypes.string.isRequired
// }

export default TaskDialog
