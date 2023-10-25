import {  useMemo, useRef, useState } from 'react'

import { useAppContext } from 'src/context/appContext'
import TextField from '@mui/material/TextField'


// ...

const TableHeader = () => {
  const { search, handleChange } = useAppContext()

  const handleSearch = e => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const [localSearch, setLocalSearch] = useState('')
  const timeoutRef = useRef(null)

  const debouncedSearchTerm = useMemo(() => {
    return e => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }, [handleChange])

  return (
    <TextField
      fullWidth={true}
      size='medium'
      name='search'
      value={localSearch}
      sx={{ mr: 6, mb: 2 }}
      onChange={debouncedSearchTerm}
      placeholder='Search by Customer Name or Id'
    />
  )
}

export default TableHeader
