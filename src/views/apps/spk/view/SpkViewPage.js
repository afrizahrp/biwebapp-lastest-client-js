// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import SpkViewLeft from 'src/views/apps/spk/view/SpkViewLeft'

import SpkViewRight from 'src/views/apps/spk/view/SpkViewRight'

import SpkViewSjHdContainer from './SpkViewSjHdContainer'

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

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/pdActivityHd/${spk_id}`)

      .then(response => {
        setActivities(response.data)
        setError(false)

        if (response.data.length > 0 && response.data[0].activity_id !== null) {
          setbolShowActivities(true)
        } else {
          setbolShowActivities(false)
        }
      })
      .catch(error => {
        setActivities(null)
        console.log(error)
      })
  }, [spk_id])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/icDocsjhd/${spk_id}`)

      .then(response => {
        setsjhdData(response.data)
        setError(false)

        if (response.data.length > 0 && response.data[0].doc_id !== null) {
          setShowSj(true)
        } else {
          setShowSj(false)
        }
      })
      .catch(error => {
        setsjhdData(null)
        console.log(error)
      })
  }, [spk_id])

  if (oneSpkHd) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          {oneSpkHd.map(spkHeaderData => {
            return <SpkViewLeft key={spkHeaderData.spk_id} showSj={showSj} {...spkHeaderData} />
          })}
        </Grid>

        <Grid item xs={12} md={4} lg={8}>
          <SpkViewRight detailData={oneSpkDt} showActivities={bolShowActivities} />

          {showSj && (
            <Grid item xs={12} md={4} lg={12}>
              <SpkViewSjHdContainer sjhdData={sjhdData} />
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default SpkViewPage
