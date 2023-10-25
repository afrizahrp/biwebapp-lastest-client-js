import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  oneSpkDt: [],
  loading: false,
  error: null
}

// // ** Fetch Users -- Trial ParamSerializer -- NOT OK

export const getSpkDetailBySpkId = createAsyncThunk('spkDetail/getSpkDetailBySpkId', async spk_id => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icSpkDt/${spk_id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

// ** Get all data
const SpkDetailSlice = createSlice({
  name: 'spkDetail',
  initialState,

  reducers: {
    setSpkData: (state, action) => {
      state.loading = false
      state.oneSpkDt = action.payload
    }
  },

  extraReducers: builder => {
    builder.addCase(getSpkDetailBySpkId.pending, state => {
      state.loading = true
    })
    builder.addCase(getSpkDetailBySpkId.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.oneSpkDt = payload
    })
    builder.addCase(getSpkDetailBySpkId.rejected, (state, { payload }) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default SpkDetailSlice.reducer
