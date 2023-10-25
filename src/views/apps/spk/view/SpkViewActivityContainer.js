import { useState, useEffect } from 'react'
import axios from 'axios'
import SpkViewActivityTimeLine from './SpkViewActivityTimeLine'
import { Grid, Box } from '@mui/material'

const SpkViewActivityContainer = ({ spk_id, catalog_no }) => {
  const [activities, setActivities] = useState([])
  const encodedId = encodeURIComponent(spk_id)
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/pdActivitydt/${encodedId}/${catalog_no}`)

      .then(response => {
        setActivities(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ left: 0, width: '100%' }}>
          {activities.map(activity => {
            return <SpkViewActivityTimeLine key={activity.activity_id} {...activity} />
          })}
        </Box>
      </Grid>
    </Grid>
  )
}

export default SpkViewActivityContainer
