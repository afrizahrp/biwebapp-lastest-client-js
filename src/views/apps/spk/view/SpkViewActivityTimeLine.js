import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'

import Typography from '@mui/material/Typography'

import moment from 'moment'

const SpkViewActivityTimeLine = ({ task_name, startDateTime, endDateTime, labor_name }) => {
  let startDate = moment(startDateTime)
  startDate = startDate.format('DD MMM YYYY')

  let endDate = moment(endDateTime)
  endDate = endDate.format('DD MMM YYYY')

  return (
    <Timeline position='left'>
      <TimelineItem>
        <TimelineOppositeContent color='text.secondary'>
          <Typography variant='title' component='span'>
            {task_name}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color='primary' />
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant='body2'>{labor_name}</Typography>
          <Typography variant='body2'>Start:{startDate}</Typography>

          <Typography variant='body2'>Finish:{endDate}</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

export default SpkViewActivityTimeLine
