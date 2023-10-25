import axios from 'axios'
import { toast } from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  attachmentUrl1: '',
  attachmentUrl2: '',
  attachmentUrl3: '',
  attachmentUrl4: '',
  attachmentUrl5: '',
  editAttachmentUrl1: '',
  editAttachmentUrl2: '',
  editAttachmentUrl3: '',
  editAttachmentUrl4: '',
  editAttachmentUrl5: '',
  editItem_cd: '',
  isEdit: false,
  total: 1,
  params: {},
  loading: false,
  error: ''
}

// // ** Fetch Users -- Trial ParamSerializer -- NOT OK
// ** Fetch ProductImage

export const fetchProductAttachmentUrl = createAsyncThunk(
  'appProductAttachmentUrl/fetchProductAttachmentUrl',
  async item_cd => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icStkmastAttachmentUrl/${item_cd}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const editProductAttachmentUrl = createAsyncThunk(
  'appProductAttachmentUrl/editProductAttachmentUrl',
  async ({ item_cd, productAttachmentUrl }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/icStkmastAttachmentUrl/${item_cd}`,
        productAttachmentUrl
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

const appProductAttachmentUrlSlice = createSlice({
  name: 'appProductAttachmentUrl',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },
    setProductAttachmentUrlData: (state, action) => {
      state.data = action.payload
    },
    setEditProductAttachmentUrl: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchProductAttachmentUrl.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProductAttachmentUrl.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
      state.params = action.meta.arg
    })
    builder.addCase(fetchProductAttachmentUrl.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
    })
    builder.addCase(editProductAttachmentUrl.pending, state => {
      state.loading = true
    })
    builder.addCase(editProductAttachmentUrl.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
      toast.success('Update Successfull')
    })
    builder.addCase(editProductAttachmentUrl.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
      toast.error('Update failed')
    })
  }
})
export const { setProductAttachmentUrlData, setEhandleChange, setEditProductAttachmentUrl } =
  appProductAttachmentUrlSlice.actions

export default appProductAttachmentUrlSlice.reducer
