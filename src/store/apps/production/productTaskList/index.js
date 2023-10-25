import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetch Product Task List
export const fetchPdItemTaskListAll = createAsyncThunk('appPdItemTaskList/fetchPdItemTaskListAll', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pdItemTaskList/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const fetchPdItemTaskList = createAsyncThunk('appPdItemTaskList/fetchPdItemTaskList', async item_cd => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pdItemTaskList/${item_cd}`)
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icSpkDt/${spk_id}`)
    // console.log('response.data.singleRow', response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

const appPdItemTaskList = createSlice({
  name: 'appPdItemTaskList',
  initialState: {
    data: [],
    error: ''
  },

  extraReducers: builder => {
    builder.addCase(fetchPdItemTaskListAll.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPdItemTaskListAll.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(fetchPdItemTaskListAll.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(fetchPdItemTaskList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPdItemTaskList.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(fetchPdItemTaskList.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})
export default appPdItemTaskList.reducer
