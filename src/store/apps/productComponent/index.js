import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
  data: [],
  total: 1,
  tkdn_pctg: 0,
  bmp_pctg: 0,
  editTkdnPctg: 0,
  editBmpPctg: 0,
  isEdit: false,
  editItem_cd: '',
  params: {},
  allData: [],
  loading: false,
  error: ''
}

// ** Fetch Component Product
export const fetchProductComponent = createAsyncThunk('appProductComponent/fetchProductComponent', async item_cd => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icStkmastComponent/${item_cd}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const editProductComponent = createAsyncThunk(
  'appProductComponent/editProductComponent',
  async ({ item_cd, productComponent }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/icStkmastComponent/${item_cd}`,
        productComponent
      )

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

const appProductComponentSlice = createSlice({
  name: 'appProductComponent',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearValues: () => {
      return { ...initialState }
    },

    setProductComponentData: (state, action) => {
      state.data = action.payload
      state.tkdn_pctg = action.payload[0].tkdn_pctg
      state.bmp_pctg = action.payload[0].bmp_pctg
    },
    setEditProductComponent: (state, { payload }) => {
      return { ...state, isEdit: true, ...payload }
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchProductComponent.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProductComponent.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.tkdn_pctg = action.payload[0].tkdn_pctg
      state.bmp_pctg = action.payload[0].bmp_pctg
      state.error = ''
      state.params = action.meta.arg

    })
    builder.addCase(fetchProductComponent.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
    })
    builder.addCase(editProductComponent.pending, state => {
      state.loading = true
    })
    builder.addCase(editProductComponent.fulfilled, (state, action) => {
      state.loading = false

      toast.success('Update Successfull')
    })

    builder.addCase(editProductComponent.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.editTkdnPctg = action.payload
      toast.error('Update failed')
    })
  }
})

export const { setProductComponentData, handleChange, setEditProductComponent } = appProductComponentSlice.actions
export default appProductComponentSlice.reducer
