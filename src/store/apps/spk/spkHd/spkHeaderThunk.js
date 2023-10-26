import axios from 'axios'

export const getAllSpkHeaderThunk = async (_, thunkAPI) => {
  const { searchStatusName, searchTypeName, searchQuery, sort } = thunkAPI.getState().spkHeader
  let url = `${process.env.NEXT_PUBLIC_API_URL}/icSpkHd?searchStatusName=${searchStatusName}&searchTypeName=${searchTypeName}&sort=${sort}` //&searchQuery=${searchQuery}`

  if (searchQuery) {
    url = url + `&searchQuery=${searchQuery}`
  }
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getOneSpkHeaderThunk = async (spk_id, thunkAPI) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/icSpkHd/${spk_id}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
