import TextField from '@mui/material/TextField'

const SearchText = ({ type, name, value, handleChange, labelText, placeholder }) => {
  return (
    <TextField
      type={type}
      fullWidth={true}
      size='medium'
      name={name}
      labelText={labelText}
      value={value}
      sx={{ mr: 6, mb: 2 }}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

export default SearchText
