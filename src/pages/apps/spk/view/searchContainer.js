import { useState, useMemo, useEffect, useCallback } from 'react'
import { CardHeader, CardContent, Card, Grid, Box, Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { handleChange, clearFilters, setSearchQuery, setClearValue } from 'src/store/apps/spk/spkHd/spkHeaderSlice'

import { fetchSpkType } from 'src/store/apps/spk/spkType'
import { fetchSpkStatus } from 'src/store/apps/spk/spkStatus'

import FormRowSelectNew from 'src/utils/FormRowSelectNew'
import SearchText from '../../../../common/searchText'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const allSpkType = useSelector(store => store.spkType.data)
  const allSpkStatus = useSelector(store => store.spkStatus.data)

  const { searchStatusName, searchTypeName, searchQuery, sort, sortOptions } = useSelector(store => store.spkHeader)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSpkType())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSpkStatus())
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
              <Grid item sm={4} xs={12}>
                <SearchText
                  type={Text}
                  size='medium'
                  name='searchQuery'
                  value={localSearch}
                  placeholder='Cari berdasarkan customer atau SPK'
                  handleChange={e => {
                    setLocalSearch(e.target.value)
                    optimizeDebounce(e.target.value)
                  }}
                />
              </Grid>
              <Grid item sm={2} xs={6}>
                <FormRowSelectNew
                  id='select-type'
                  label='Pilih Jenis'
                  labelId='type-select'
                  name='searchTypeName'
                  labelText='Pilih Jenis'
                  handleChange={handleSearch}
                  inputProps={{ placeholder: 'Semua Jenis' }}
                  value={searchTypeName}
                  list={['Semua Jenis', ...allSpkType.map(spkType => spkType.spk_typeName)]}
                />
              </Grid>
              <Grid item sm={2} xs={6}>
                <FormRowSelectNew
                  id='select-status'
                  label='Pilih Status'
                  labelId='status-select'
                  name='searchStatusName'
                  labelText='Pilih Status'
                  handleChange={handleSearch}
                  inputProps={{ placeholder: 'Semua Status' }}
                  value={searchStatusName}
                  list={['Semua Status', ...allSpkStatus.map(spkStatus => spkStatus.status_name)]}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <FormRowSelectNew
                  id='select-sort'
                  label='Urutkan'
                  labelId='select-sort'
                  name='sort'
                  fontSize='0.2rem'
                  labelText='Urutkan'
                  handleChange={handleSearch}
                  value={sort}
                  list={sortOptions}
                />
              </Grid>
              <Grid container item xs='auto'>
                {' '}
                {/* Added container */}
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
