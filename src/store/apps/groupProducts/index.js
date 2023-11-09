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

// // ** Fetch Users -- Trial ParamSerializer -- NOT OK
// ** Fetch Products
export const getGroupProductList = createAsyncThunk('appGroupProduct/getGroupProductList', async () => {
  try {
    const response = await axios.get('/api/groupProducts/')
    console.log('group products', response.data)

    // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groupProducts/`)

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

const appGroupProductsSlice = createSlice({
  name: 'appGroupProduct',
  initialState,
  extraReducers: builder => {
    builder.addCase(getGroupProductList.pending, state => {
      state.loading = true
    })
    builder.addCase(getGroupProductList.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
      state.params = action.meta.arg
      state.allData = action.payload
    })
    builder.addCase(getGroupProductList.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
    })
  }
})

export default appGroupProductsSlice.reducer
