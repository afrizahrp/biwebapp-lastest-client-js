import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from 'src/store/apps/product'
import TextField from '@mui/material/TextField'

const TableHeader = ({ placeholder }) => {
  const dispatch = useDispatch()
  const [localSearch, setLocalSearch] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSearch = searchTerm => {
    dispatch(setSearchQuery({ name: 'searchQuery', value: searchTerm }))
  }
  const handleFilter = searchTerm => {
    setLocalSearch(searchTerm)

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      console.log(`Searching for : "${searchTerm}"...`)
      handleSearch(searchTerm)
    }, 1000)
  }

  const handleChange = e => {
    const searchTerm = e.target.value
    handleFilter(searchTerm)
  }

  return (
    <TextField
      fullWidth={true}
      size='medium'
      name='searchQuery'
      value={localSearch}
      sx={{ mr: 6, mb: 2 }}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

export default TableHeader
