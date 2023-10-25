// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { tr } from 'date-fns/locale'
import { toast } from 'react-hot-toast'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async calendar => {
  const params = new URLSearchParams({
    calendar: calendar || 'View All'
  }).toString()

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/`, {
    params: {
      params
    }
  })
  return response.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events/insert`, {
    data: {
      event
    }
  })

  console.log(response.data)
  await dispatch(fetchEvents(['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']))

  return response.data.event
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch }) => {
  try {
    const response = axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`, event)

    await dispatch(fetchEvents(['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']))

    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    cust_name: null,
    selectedEvent: null,
    selectedCalendars: ['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
      toast.success('Update Successfull')
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})

export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer
