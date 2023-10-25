// ** React Imports

import { useState, useEffect, useCallback, forwardRef, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import StepperWrapper from 'src/@core/styles/mui/stepper'

import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid' // Step 1: Import Grid component
import StepContent from '@mui/material/StepContent'

import moment from 'moment'
import 'moment/locale/id' // Import the Indonesian locale

import { getTaskBySpkAndItemCd, setEditPlanDt, getUnassignedTasks } from 'src/store/apps/production/plan/planDetail'
import TaskDialog from './TaskDialog'

// ** Third Party Imports
import clsx from 'clsx'
import { Alert } from '@mui/material'

import SetupPlan from './SetupPlan'
// ** Custom Components Imports
import StepperCustomDot from '../../../../../views/apps/production/plan/StepperCustomDot'

const TaskStepper = ({ open, spk_id, item_cd, onClose }) => {
  if (!open) {
    return null // Do not render if not open
  }

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [openTaskDialog, setOpenTaskDialog] = useState(false)

  const [selectedId, setSelectedId] = useState(null)
  const [selectedSpk, setSelectedSpk] = useState(spk_id)
  const [selectedItem, setSelectedItem] = useState(item_cd)
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [selectedTaskName, setSelectedTaskName] = useState(null)
  const [selectedPlanStartDate, setSelectedPlanStartDate] = useState(null)
  const [selectedPlanEndDate, setSelectedPlanEndDate] = useState(null)
  const [selectedAssignedTo, setSelectedAssignedTo] = useState(null)
  const [selectedRemarks, setSelectedRemarks] = useState(null)
  const [selectedItemDescs, setSelectedItemDescs] = useState(null)
  const [selectedCatalogNo, setSelectedCatalogNo] = useState(null)
  const [selectedItemQty, setSelectedItemQty] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const [isCompleted, setIsCompleted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const { tasks } = useSelector(state => state.planDetail)

  const unAssignedTask = useSelector(state => state.planDetail.tasks)

  const handleCheckUnassignedTask = () => {
    const unassignedTaskExists = tasks.some(step => !step.assigned)

    if (unassignedTaskExists) {
      setShowAlert(true)
    } else {
      console.log('All tasks have been assigned.')
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskBySpkAndItemCd({ spk_id, item_cd }))
  }, [dispatch, spk_id, item_cd])

  const handleGetUnassignedTasks = () => {
    dispatch(getUnassignedTasks())
    return <SetupPlan unAssignedTask={unAssignedTask} />
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSetSchedule = (
    spk_id,
    item_cd,
    id,
    taskId,
    taskName,
    planStartDate,
    planEndDate,
    assignedTo,
    remarks,
    item_descs,
    catalog_no,
    item_qty,
    isEdit
  ) => {
    setSelectedId(id)
    setSelectedSpk(spk_id)
    setSelectedItem(item_cd)
    setSelectedTaskId(taskId)
    setSelectedTaskName(taskName)
    setSelectedPlanStartDate(planStartDate)
    setSelectedPlanEndDate(planEndDate)
    setSelectedAssignedTo(assignedTo)
    setSelectedRemarks(remarks)
    setSelectedItemDescs(item_descs)
    setSelectedCatalogNo(catalog_no)
    setSelectedItemQty(item_qty)

    setIsEdit(true)

    dispatch(
      setEditPlanDt({
        isEdit: true,
        editPlanDt: id,
        spk_id,
        item_cd,
        taskId,
        taskName,
        planStartDate,
        planEndDate,
        assignedTo
      })
    )
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    // console.log('activeStep: ', activeStep, tasks.length)
    const newActiveStep = activeStep + 1
    if (newActiveStep === tasks.length - 1) {
      handleCheckUnassignedTask()
    }
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StepperWrapper>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {tasks.map(step => {
              return (
                <Step key={step.id} className={clsx({ active: activeStep === step.id })}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <div>
                        <Typography className='step-title'>
                          {step.taskName} ({step.taskId})
                        </Typography>
                      </div>
                    </div>
                  </StepLabel>
                  <StepContent>
                    <Typography variant='subtitle2' fontSize='0.85rem'>
                      Jadwal Pelaksanaan: {moment(step.planStartDate).locale('id').format('DD MMM yyyy')}-
                      {moment(step.planEndDate).locale('id').format('DD MMM yyyy')}
                    </Typography>
                    <Typography variant='subtitle2' fontSize='0.85rem'>
                      Pelaksana : {step.assignedTo}
                    </Typography>
                    <Typography variant='subtitle2' fontSize='0.85rem'>
                      Keterangan:
                      <Typography fontStyle='italic' fontSize='0.85rem' sx={{ whiteSpace: 'pre-line', ml: 2 }}>
                        {step.remarks}
                      </Typography>
                    </Typography>

                    {/* <Button size='small' color='secondary' variant='outlined' onClick={handleGetUnassignedTasks}>
                      unAssignedTask
                    </Button> */}

                    <div className='button-wrapper'>
                      <Button
                        size='small'
                        color='secondary'
                        variant='outlined'
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        Kembali
                      </Button>
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => {
                          // handleCheckUnassignedTask()
                          handleNext()
                        }}
                        sx={{ ml: 4 }}
                        disabled={showAlert ? true : false}
                      >
                        {activeStep === tasks.length - 1 ? 'Selesai' : 'Selanjutnya'}
                      </Button>

                      <Button
                        size='small'
                        variant={step.assigned ? 'contained' : 'outlined'}
                        onClick={() => {
                          handleSetSchedule(
                            step.spk_id,
                            step.item_cd,
                            step.id,
                            step.taskId,
                            step.taskName,
                            step.planStartDate,
                            step.planEndDate,
                            step.assignedTo,
                            step.remarks,
                            step.item_descs,
                            step.catalog_no,
                            step.item_qty
                          )
                          setOpenTaskDialog(true)
                        }}
                        sx={{ ml: 4 }}
                      >
                        {step.assigned ? 'Ubah Jadwal' : 'Buat Jadwal'}
                        {/* {activeStep === tasks.length - 1 ? 'Set Last Schedule' : 'Set Schedule'} */}
                      </Button>
                      {showAlert && (
                        <Alert severity='warning' onClose={() => setShowAlert(false)}>
                          Ada jadwal yang belum kamu atur
                        </Alert>
                      )}

                      {/* {activeStep === tasks.length - 1 && showAlert && (
                        <Alert severity='warning' onClose={() => setShowAlert(false)}>
                          Ada tugas yang belum kamu atur.
                        </Alert>
                      )} */}
                    </div>
                  </StepContent>
                </Step>
              )
            })}

            {selectedId && (
              <TaskDialog
                open={openTaskDialog}
                selectedId={selectedId}
                spk_id={selectedSpk}
                item_cd={selectedItem}
                taskId={selectedTaskId}
                taskName={selectedTaskName}
                planStartDate={selectedPlanStartDate}
                planEndDate={selectedPlanEndDate}
                assignedTo={selectedAssignedTo}
                remarks={selectedRemarks}
                item_descs={selectedItemDescs}
                catalog_no={selectedCatalogNo}
                item_qty={selectedItemQty}
                isEdit={selectedId ? true : false}
                onClose={() => {
                  setOpenTaskDialog(false)
                  setSelectedId(null)
                }}
              />
            )}
          </Stepper>
        </StepperWrapper>

        {activeStep === tasks.length && (
          <Box sx={{ mt: 4 }}>
            <Typography>Semua jadwal tugas sudah kamu atur</Typography>
            <Button size='small' sx={{ mt: 2 }} variant='contained' onClick={handleReset}>
              Atur Ulang Jadwal
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default TaskStepper
