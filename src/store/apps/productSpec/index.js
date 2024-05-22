import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
  data: [],
  oneProductSpec: [],

  isEdit: false,
  total: 1,
  params: {},
  loading: false,
  error: ''
}

export const getAllProductSpec = createAsyncThunk('productSpecs/getAllProductSpec', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ProductSpecs/`)

    return response.data
  } catch (error) {
    console.error(error)

    return null
  }
})

export const getProductSpec = createAsyncThunk('productSpecs/getProductSpec', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ProductSpecs/${id}`)

    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const editProductSpec = createAsyncThunk(
  'productSpecs/editProductSpec',
  async ({ id, productSpec }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/ProductSpecs/${id}`, productSpec)

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// async ({ id, productImageUrl }, { rejectWithValue }) => {
//   try {
//     const response = await axios.patch(
//       `${process.env.NEXT_PUBLIC_API_URL}/icStkmastImgUrl/${id}`,
//       productImageUrl
//     )
//     return response.data
//   } catch (error) {
//     return rejectWithValue(error.response.data)
//   }
// }
// )

const productSpecSlice = createSlice({
  name: 'productSpecs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },
    setProductSpecData: (state, action) => {
      state.oneProductSpec = action.payload
    },
    setEditProductSpec: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    }
  },

  extraReducers: builder => {
    builder.addCase(getAllProductSpec.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProductSpec.fulfilled, (state, action) => {
      state.loading = false
      state.oneProductSpec = action.payload
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(getAllProductSpec.rejected, state => {
      state.loading = false
      toast.error(`Gagal mengambil data spesifikasi produk`)
    })

    builder.addCase(getProductSpec.pending, state => {
      state.loading = true
    })
    builder.addCase(getProductSpec.fulfilled, (state, action) => {
      state.loading = false
      state.oneProductSpec = action.payload
      state.error = ''
    })
    builder.addCase(getProductSpec.rejected, state => {
      state.loading = false
      toast.error(`Gagal mengambil data spesifikasi produk`)
    })
    builder.addCase(editProductSpec.pending, state => {
      state.loading = true
    })
    builder.addCase(editProductSpec.fulfilled, state => {
      state.loading = false
      state.isEdit = false
      toast.success(`Spesifikasi produk berhasil disimpan`)
    })
    builder.addCase(editProductSpec.rejected, (state, action) => {
      state.loading = false
      state.oneProductSpec = []
      state.error = action.error.message
      toast.error(`Spesifikasi produk gagal disimpan`)
    })
  }
})

export const { setProductSpecData, setEhandleChange, setEditProductSpec } = productSpecSlice.actions

export default productSpecSlice.reducer
