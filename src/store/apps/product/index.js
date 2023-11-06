import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialFilterState = {
  search: '',
  searchQuery: '',
  searchCategory: 'Semua Kategori'
}

const initialState = {
  data: [],
  oneProduct: [],
  allProducts: [],
  catalog_no: '',
  item_cd: '',
  item_descs: '',
  group_descs: '',
  uom_cd: '',
  totalRows: 0,
  totalPages: 1,
  status: 'idle',
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

// // ** Fetch Users -- Trial ParamSerializer -- NOT OK
// // ** Fetch Products
// export const getAllProduct = createAsyncThunk('products/getAllProduct', async (_, thunkAPI) => {
//   const { searchCategory, searchQuery } = thunkAPI.getState()

//   let url = `${process.env.NEXT_PUBLIC_API_URL}/icStkmast`

//   const params = {
//     searchCategory,
//     searchQuery
//   }

//   try {
//     const response = await axios.get(url, { params })
//     console.log('response.data', response.data)
//     return response.data
//   } catch (error) {
//     console.error(error)

//     return null
//   }
// })
export const getAllProduct = createAsyncThunk('products/getAllProduct', async ({ searchCategory, searchQuery }) => {
  // async ({ group_descs, searchQuery, page, perPage }) => {

  try {
    const params = new URLSearchParams({
      group_descs: searchCategory || 'Semua Kategori',
      searchQuery: searchQuery || '',
      ...(searchQuery || {})
    }).toString()

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/?searchCategory=${searchCategory}&searchQuery=${searchQuery}`
    )

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

export const getProductById = createAsyncThunk('products/getProductById', async ({ item_cd }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/icStkmast/${item_cd}`
    const response = await axios.get(URL)

    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const editProductImageUrl = createAsyncThunk(
  'products/editProductImageUrl',
  async ({ item_cd, product }, thunkAPI) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/icStkmast/${item_cd}`, product)

      return response.data
    } catch (error) {
      return tuhknAPI.rejectWithValue(error.response.data)
    }
  }
)

// export const updatePlanDetail = createAsyncThunk(
//   'planDetail/updatePlanDetail',
//   async ({ id, productionPlanDt }, thunkAPI) => {
//     try {
//       const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/pdplanactivitydt/${id}`, productionPlanDt)
//       return response.data
//     } catch (error) {
//       console.error(error, thunkAPI)
//       return thunkAPI.rejectWithValue(error.response.data)
//     }
//   }
// )

const ProductSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    // handleChange: (state, { payload: { name, value } }) => {
    //   state.page = 1
    //   state[name] = value
    // },

    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1
      if (name === 'searchCategory') {
        state.searchCategory = value // Update searchCategory
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
    setEditProductImageUrl: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    },
    setClearValue: () => {
      return { ...initialState }
    },
    clearAllProductState: state => initialState
  },

  extraReducers: builder => {
    builder.addCase(getAllProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.data = action.payload
      state.allProducts = action.payload
      state.params = action.meta.arg
      state.currentPage = action.payload
      state.error = ''
    })
    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    builder.addCase(getProductById.pending, state => {
      state.loading = true
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.oneProduct = action.payload
      state.item_cd = action.payload[0]?.item_cd
      state.item_descs = action.payload[0]?.item_descs
      state.catalog_no = action.payload[0]?.catalog_no
      state.uom_cd = action.payload[0]?.uom_cd
      state.data = action.payload
      state.params = action.meta.arg
      state.error = ''
    })
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(editProductImageUrl.pending, state => {
      state.loading = true
    })
    builder.addCase(editProductImageUrl.fulfilled, state => {
      state.loading = false
      state.isEdit = false
      toast.success('Gambar berhasil disimpan')
    })
    builder.addCase(editProductImageUrl.rejected, (state, action) => {
      state.loading = false
      state.oneProduct = []
      state.error = action.error.message
      toast.error('Gambar gagal disimpan')
    })
  }
})

export const {
  setClearValue,
  setCurrentPage,
  setPerPage,
  setSearchQuery,
  handleChange,
  clearAllProductState,
  clearFilters
} = ProductSlice.actions

export default ProductSlice.reducer
