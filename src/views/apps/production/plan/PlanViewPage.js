// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Next Import

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components

// ** Demo Components Imports
import SpkViewLeft from 'src/views/apps/spk/view/SpkViewLeft'

import SpkViewRight from 'src/views/apps/spk/view/SpkViewRight'

import SpkViewSjHdContainer from './SpkViewSjHdContainer'

import PlanViewTaskScheduled from './PlanViewTaskScheduled'

import SetupPlan from 'src/pages/apps/production/plan/view/SetupPlan'
import { getOneSpkHeader } from 'src/store/apps/spk/spkHd/spkHeaderSlice'

import { getSpkDetailBySpkId } from 'src/store/apps/spk/spkDt'

const SpkViewPage = ({ spk_id }) => {
  // ** State

  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [spkDetailData, setSpkDetailData] = useState(null)
  const [activities, setActivities] = useState([])
  const [sjhdData, setsjhdData] = useState([])
  const [bolShowActivities, setbolShowActivities] = useState(false)
  const [showSj, setShowSj] = useState(false)

  const { oneSpkHd } = useSelector(state => state.spkHeader)

  const { oneSpkDt } = useSelector(state => state.spkDetail)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneSpkHeader(spk_id))
  }, [dispatch, spk_id])

  useEffect(() => {
    dispatch(getSpkDetailBySpkId(spk_id))
  }, [dispatch, spk_id])

  // if (oneSpkHd) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <PlanViewTaskScheduled />
      </Grid>
    </Grid>
  )
}

export default SpkViewPage
