import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  data: [],

  error: null
}
// ** Fetch SPK Status Name
export const fetchSpkStatus = createAsyncThunk('appSpkStatus/fetchSpkStatus', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icSpkStatus`)
    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

// ** Get all data
const appSpkStatusSlice = createSlice({
  name: 'appSpkStatus',
  initialState,

  reducers: {
    setClearValue: () => {
      return { ...initialState }
    },
    setSpkData: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.params = action.meta.arg
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchSpkStatus.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSpkStatus.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.data = action.payload
      state.params = action.meta.arg
    })
    builder.addCase(fetchSpkStatus.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default appSpkStatusSlice.reducer
