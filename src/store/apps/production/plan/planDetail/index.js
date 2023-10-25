import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  spk_id: '',
  item_cd: '',
  id: '',
  item_descs: '',
  catalog_no: '',
  item_qty: '',
  uom_cd: '',
  taskId: '',
  assignedTo: '',
  planStartDate: '',
  planEndDate: '',
  remarks: '',
  isEdit: false,
  editPlanId: '',
  params: {},
  tasks: [],
  oneTask: [],
  loading: false,
  error: ''
}

export const getTaskById = createAsyncThunk('planDetail/getTaskById', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pdPlanActivityDt/byId/${id}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getTaskBySpkAndItemCd = createAsyncThunk(
  'planDetail/getTaskBySpkAndItemCd',
  async ({ spk_id, item_cd }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pdplanactivitydt/bySpkIdAndItemCd/${spk_id}/${item_cd}`
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//** update production plan by spk_id and Item_cd and taskId
export const updatePlanDetail = createAsyncThunk(
  'planDetail/updatePlanDetail',
  async ({ id, productionPlanDt }, thunkAPI) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/pdplanactivitydt/${id}`, productionPlanDt)
      return response.data
    } catch (error) {
      console.error(error, thunkAPI)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const planDetailSlice = createSlice({
  name: 'planDetail',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },

    setEditPlanDt: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    },
    getUnassignedTasks: state => {
      state.tasks = state.tasks.filter(task => task.assigned === false)
    }
  },

  extraReducers: builder => {
    builder.addCase(getTaskById.pending, state => {
      state.loading = true
    })
    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.loading = false
      state.oneTask = action.payload
      state.error = ''
      state.params = action.meta.arg
    })

    builder.addCase(getTaskBySpkAndItemCd.pending, state => {
      state.loading = true
    })
    builder.addCase(getTaskBySpkAndItemCd.fulfilled, (state, action) => {
      state.loading = false
      if (Array.isArray(action.payload)) {
        state.tasks = action.payload
      } else {
        state.tasks = []
        console.error('API response is not an array:', action.payload)
      }
      state.error = ''
      state.params = action.meta.arg
    })

    builder.addCase(updatePlanDetail.pending, state => {
      state.loading = true
    })
    builder.addCase(updatePlanDetail.fulfilled, state => {
      state.loading = false
      state.error = ''
      state.isEdit = false
    })
    builder.addCase(updatePlanDetail.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
  }
})

export const { handleChange, setEditPlanDt, getUnassignedTasks } = planDetailSlice.actions
export default planDetailSlice.reducer
