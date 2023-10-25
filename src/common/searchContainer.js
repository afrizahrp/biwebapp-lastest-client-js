import { useState } from 'react'
import { useAppContext } from 'src/context/appContext'
import { CardHeader, CardContent, Card, Grid, Box, Button } from '@mui/material'
import FormRowSelectNew from 'src/utils/FormRowSelectNew'
import TableHeader from 'src/views/apps/spk/list/TableHeader'

const SearchContainer = () => {
  const { searchGroupDescs, searchType, searchStatus, handleChange, clearFilters, spkTypeOptions, spkStatusOptions } =
    useAppContext()

  const [localSearch, setLocalSearch] = useState('')

  const handleSearch = e => {
    setLocalSearch(e.target.value)
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Search and Filters'
            fontSize={9}
            sx={{ pb: 1, pt: 1, position: 'sticky', '& .MuiCardHeader-subheader': { letterSpacing: '.15px' } }}
          />

          <CardContent>
            <Grid container spacing={3}>
              <Grid item sm={4} xs={12}>
                <TableHeader handleFilter={handleSearch} value={localSearch} />
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormRowSelectNew
                  id='select-type'
                  label='Select Type'
                  labelId='type-select'
                  name='searchType'
                  labelText='Select Type'
                  value={searchType}
                  handleChange={handleSearch}
                  inputProps={{ placeholder: 'All Type' }}
                  list={['All Type', ...spkTypeOptions]}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormRowSelectNew
                  id='select-status'
                  label='Select Status'
                  labelId='status-select'
                  name='searchStatus'
                  labelText='Select Status'
                  value={searchStatus}
                  handleChange={handleSearch}
                  inputProps={{ placeholder: 'All Status' }}
                  list={['All Status', ...spkStatusOptions]}
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
