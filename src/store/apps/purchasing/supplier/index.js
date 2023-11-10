import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialFilterState = {
  search: '',
  searchQuery: '',
  searchStatus: 'Semua Status'
}

const initialState = {
  data: [],
  oneSupplier: [],
  allSupplier: [],
  supplier_cd: '',
  totalPages: 1,
  status: 'aktif',
  loading: false,
  error: null,
  params: {
    group_descs: 'Semua Kategori',
    page: 1,
    perPage: 5,
    searchQuery: ''
  },
  ...initialFilterState
}

export const getAllSupplier = createAsyncThunk('suppliers/getAllSupplier', async ({ searchStatus, searchQuery }) => {
  try {
    const response = await axios.get(`/api/suppliers/?searchStatus=${searchStatus}&searchQuery=${searchQuery}`)

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

export const getSupplierById = createAsyncThunk('suppliers/getSupplierById', async ({ item_cd }) => {
  try {
    const URL = `/api/po_supplier/${item_cd}`
    const response = await axios.get(URL)

    return response.data
  } catch (error) {
    console.error(error)
  }
})

const SupplierSlice = createSlice({
  name: 'suppliers',
  initialState,

  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      if (name === 'searchStatus') {
        state.searchStatus = value // Update searchStatus
      }
      if (name === 'searchQuery') {
        state.searchQuery = value // Update searchQuery
      }
    },

    clearFilters: state => {
      return { ...state, ...initialFilterState }
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload
    },

    setSearchQuery: (state, action) => {
      const { name, value } = action.payload
      state.params.searchQuery = { ...state.params.searchQuery, [name]: value }
    },
    setClearValue: () => {
      return { ...initialState }
    },
    clearAllSupplierState: () => initialState
  },

  extraReducers: builder => {
    builder.addCase(getAllSupplier.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllSupplier.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.data = action.payload
      state.allProducts = action.payload
      state.params = action.meta.arg
      state.currentPage = action.payload
      state.error = ''
    })
    builder.addCase(getAllSupplier.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(getSupplierById.pending, state => {
      state.loading = true
    })
    builder.addCase(getSupplierById.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.oneSupplier = action.payload
      state.data = action.payload
      state.params = action.meta.arg
      state.error = ''
    })
    builder.addCase(getSupplierById.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const {
  setClearValue,
  setCurrentPage,
  setPerPage,
  setSearchQuery,
  handleChange,
  clearAllSupplierState,
  clearFilters
} = SupplierSlice.actions

export default SupplierSlice.reducer
