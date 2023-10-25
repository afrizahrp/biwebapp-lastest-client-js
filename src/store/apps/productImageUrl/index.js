import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
const initialState = {
  data: [],
  oneProductImgUrl: [],
  imgUrl1: '',
  imgUrl2: '',
  imgUrl3: '',
  imgUrl4: '',
  imgUrl5: '',
  editImgUrl1: '',
  editImgUrl2: '',
  editImgUrl3: '',
  editImgUrl4: '',
  editImgUrl5: '',
  editItem_cd: '',
  isEdit: false,
  total: 1,
  params: {},
  loading: false,
  error: ''
}

export const getAllProductImageUrl = createAsyncThunk('productImageUrl/getAllProductImageUrl', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icStkmastImgUrl/`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
})

// ** Fetch ProductImageUrl
export const getProductImageUrl = createAsyncThunk(
  'productImageUrl/getProductImageUrl',
  async ({ item_cd }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icStkmastImgUrl/${item_cd}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editProductImageUrl = createAsyncThunk(
  'productImageUrl/editProductImageUrl',
  async ({ item_cd, productImageUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/icStkmastImgUrl/${item_cd}`,
        productImageUrl
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const productImageUrlSlice = createSlice({
  name: 'productImageUrl',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },
    setProductImageUrlData: (state, action) => {
      state.oneProductImgUrl = action.payload
    },
    setEditProductImageUrl: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    }
  },

  extraReducers: builder => {
    builder.addCase(getAllProductImageUrl.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProductImageUrl.fulfilled, (state, action) => {
      state.loading = false
      state.oneProductImgUrl = action.payload
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(getAllProductImageUrl.rejected, state => {
      state.loading = false
      toast.error(`Gagal memanggil data image url`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      })
    })

    builder.addCase(getProductImageUrl.pending, state => {
      state.loading = true
    })
    builder.addCase(getProductImageUrl.fulfilled, (state, action) => {
      state.loading = false
      state.oneProductImgUrl = action.payload
      state.error = ''
    })
    builder.addCase(getProductImageUrl.rejected, state => {
      state.loading = false
      toast.error(`Gagal memanggil data image url`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      })
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
      state.oneProductImgUrl = []
      state.error = action.error.message
      toast.error('Gambar gagal disimpan')
    })
  }
})
export const { setProductImageUrlData, setEhandleChange, setEditProductImageUrl } = productImageUrlSlice.actions

export default productImageUrlSlice.reducer
