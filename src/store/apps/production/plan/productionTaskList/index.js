import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetch Component Product
export const fetchPdTaskList = createAsyncThunk('appPdTaskList/fetchPdTaskList', async plan => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pdTaskList/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

const appPlaActivityHdSlice = createSlice({
  name: 'appPdTaskList',
  initialState: {
    data: [],
    error: ''
  },

  extraReducers: builder => {
    builder.addCase(fetchPdTaskList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPdTaskList.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(fetchPdTaskList.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})
export default appPlaActivityHdSlice.reducer
