import { useState, useMemo, useEffect, useCallback } from 'react'
import { CardHeader, CardContent, Card, Grid, Box, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { handleChange, clearFilters, setSearchQuery, setClearValue } from 'src/store/apps/product'

import { getGroupProductList } from 'src/store/apps/groupProduct'

import FormRowSelectNew from 'src/utils/FormRowSelectNew'
import SearchText from '../../../../common/searchText'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const allGroupProduct = useSelector(state => state.groupProduct.data)
  const { searchCategory, searchQuery } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGroupProductList())
  }, [dispatch])

  const handleSearch = e => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }

  const debounce = useCallback((fn, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }, [])

  const optimizeDebounce = useMemo(
    () => debounce(value => handleSearch({ target: { name: 'searchQuery', value } }), 1000),
    [debounce]
  )

  const handleSubmit = e => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ marginBottom: '10px', marginTop: -5 }}>
          <CardHeader
            title='Cari dan Filter'
            fontSize={9}
            sx={{ pb: 1, pt: 1, position: 'sticky', '& .MuiCardHeader-subheader': { letterSpacing: '.15px' } }}
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item sm={7} xs={12}>
                <SearchText
                  type={Text}
                  size='medium'
                  name='searchQuery'
                  value={localSearch}
                  placeholder='Cari berdasarkan produk atau katalog'
                  handleChange={e => {
                    setLocalSearch(e.target.value)
                    optimizeDebounce(e.target.value)
                  }}
                />
              </Grid>

              <Grid item sm={3} xs={12}>
                <FormRowSelectNew
                  id='select-category'
                  label='Pilih Kategori'
                  labelId='category-select'
                  name='searchCategory'
                  labelText='Pilih Kategori'
                  handleChange={handleSearch}
                  inputProps={{ placeholder: 'Semua Kategori' }}
                  value={searchCategory}
                  list={[
                    'Semua Kategori',
                    ...allGroupProduct.map(group =>
                      group.group_descs
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                    )
                  ]}

                  // list={['Semua Kategori', ...allGroupProduct.map(group => group.group_descs)]}
                />
              </Grid>
              <Grid item xs='auto'>
                <Box sx={{ mt: 1, pt: 1 }}>
                  <Button variant='contained' size='large' onClick={handleSubmit}>
                    Refresh
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default SearchContainer
