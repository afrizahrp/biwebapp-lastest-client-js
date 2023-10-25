import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getAllSpkHeaderThunk, getOneSpkHeaderThunk } from './spkHeaderThunk'
import toast from 'react-hot-toast'

const initialFilterState = {
  searchQuery: '',
  search: '',
  searchTypeName: 'Semua Jenis',
  searchStatusName: 'Semua Status'
}
const initialState = {
  allSpkHd: [],
  oneSpkHd: [],
  params: {
    page: 1,
    perPage: 5
  },
  spk_id: '',
  cust_name: '',
  totalRows: 0,
  totalPages: 1,
  status_name: '',
  spk_typeName: '',
  loading: false,
  viewSpkId: '',
  error: null,
  ...initialFilterState
}

export const getAllSpkHeader = createAsyncThunk('spkHeader/getAllSpkHeader', getAllSpkHeaderThunk)

export const getOneSpkHeader = createAsyncThunk('spkHeader/getOneSpkHeader', getOneSpkHeaderThunk)

const spkHeaderSlice = createSlice({
  name: 'spkHeader',
  initialState,

  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      state[name] = value
    },

    clearFilters: state => {
      return { ...state, ...initialFilterState }
    },

    setClearValue: () => {
      return { ...initialState }
    },
    setAllSpkHdData: (state, action) => {
      state.loading = false
      state.allSpkHd = action.payload
      state.params = action.meta.arg
    },
    setOneSpkHdData: (state, action) => {
      state.loading = false
      state.oneSpkHd = action.payload
      state.params = action.meta.arg
    },
    clearAllSpkState: state => initialState
  },

  extraReducers: builder => {
    builder.addCase(getAllSpkHeader.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllSpkHeader.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.allSpkHd = action.payload
    })
    builder.addCase(getAllSpkHeader.rejected, (state, action) => {
      state.loading = false
      toast.error(payload)
    }),
      builder.addCase(getOneSpkHeader.pending, state => {
        state.loading = true
      })
    builder.addCase(getOneSpkHeader.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.oneSpkHd = action.payload
    })
    builder.addCase(getOneSpkHeader.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const { setAllSpkHdData, setOneSpkHdData, clearFilters, handleChange, clearAllSpkState } = spkHeaderSlice.actions

export default spkHeaderSlice.reducer
