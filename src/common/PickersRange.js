// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'

import id from 'date-fns/locale/id'

registerLocale('id', id)

const PickersRange = ({ popperPlacement, planStartDate, planEndDate, onUpdateDateRange }) => {
  // ** States
  const [startDate, setStartDate] = useState(planStartDate || null)
  const [endDate, setEndDate] = useState(planEndDate || null)
  const [startDateRange, setStartDateRange] = useState(new Date(planStartDate))
  const [endDateRange, setEndDateRange] = useState(new Date(planEndDate))
  const [holidays, setHolidays] = useState([])

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    setStartDateRange(start)
    setEndDateRange(end)

    onUpdateDateRange(start, end)
  }

  const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'dd MMM yyyy', { locale: id })
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd MMM yyyy', { locale: id })}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePicker
          selectsRange
          monthsShown={2}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          popperPlacement={popperPlacement}
          locale='id' // Set the locale to 'id' for Indonesian
          customInput={<CustomInput label='Jadwal Pelaksanaan' end={endDateRange} start={startDateRange} />}
        />
      </div>
    </Box>
  )
}

export default PickersRange
