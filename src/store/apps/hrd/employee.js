import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  allEmployee: [],
  oneEmployee: [],
  loading: false,
  error: null
}

export const getAllEmployee = createAsyncThunk('employee/getAllEmployee', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/employee/`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}) // // ** Fetch Users -- Trial ParamSerializer -- NOT OK

export const getOneEmployee = createAsyncThunk('employee/getOneEmployee', async spk_id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icSpkDt/${spk_id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

// ** Get all data
const employeeSlice = createSlice({
  name: 'employee',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(getAllEmployee.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllEmployee.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.allEmployee = action.payload
    })
    builder.addCase(getAllEmployee.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default employeeSlice.reducer
