import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  data: [],

  error: null
}
// ** Fetch SPK Type Name
export const fetchSpkType = createAsyncThunk('spkType/fetchSpkType', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icSpkType/`)
    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

// ** Get all data
const spkTypeSlice = createSlice({
  name: 'spkType',
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
    builder.addCase(fetchSpkType.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchSpkType.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.data = action.payload
      state.params = action.meta.arg
    })
    builder.addCase(fetchSpkType.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default spkTypeSlice.reducer
