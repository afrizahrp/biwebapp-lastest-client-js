import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  loading: false,
  error: ''
}

// ** Fetch Depts
export const fetchData = createAsyncThunk('appUsers/fetchData', async ({ role, currentPlan, status }) => {
  try {
    const params = new URLSearchParams({
      role: role || '',
      currentPlan: currentPlan || '',
      status: status || ''
    }).toString()

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?${params}`)

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

// add new dept with axios post interceptor and auth header
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  try {
    //     const token = localStorage.getItem(authConfig.storageTokenKeyName)
    // console.log(token)
    const response = await axios.post('http://localhost:7000/users/new', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    //display success message
    toast.success('New User Added')

    dispatch(fetchData(getState()))

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
      state.total = action.payload
      state.params = action.payload
      state.allData = action.payload
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
    })
  }
})

export default appUsersSlice.reducer
