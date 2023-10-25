import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetch Component Product
export const getAllPlanHd = createAsyncThunk('planHeader/getAllPlanHd', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pdPlanActivityHd/`)
    console.log('response: ', response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

const planHeaderSlice = createSlice({
  name: 'planHeader',
  initialState: {
    allPlanHd: [],
    onePlan: [],
    data: [],
    selectedPlan: null,
    selectedStatus: ['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']
  },
  reducers: {
    handleSelectPlan: (state, action) => {
      state.selectedPlan = action.payload
    },
    handlePlanUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(item => item === action.payload)
      if (state.selectedStatus.includes(action.payload)) {
        state.selectedStatus.splice(filterIndex, 1)
      } else {
        state.selectedStatus.push(action.payload)
      }
      if (state.selectedStatus.length === 0) {
        state.plans.length = 0
      }
    },
    handleAllPlans: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedStatus = ['Warning', 'Progress', 'Completed', 'Canceled', 'Expired']
      } else {
        state.selectedStatus = []
      }
    },
    clearValues: () => {
      return { ...initialState }
    },

    fetchAllPlanHd: (state, action) => {
      state.allPlanHd = action.payload
    }
  },

  extraReducers: builder => {
    builder.addCase(getAllPlanHd.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllPlanHd.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(getAllPlanHd.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})
export const { fetchAllPlanHd, handleSelectPlan, handlePlanUpdate, handleAllPlans, clearValues } =
  planHeaderSlice.actions
export default planHeaderSlice.reducer
