import { MenuItem } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import TextField from '@mui/material/TextField'
const FormRow = ({ id, type, name, value, handleChange, labelText }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{labelText}</InputLabel>
      <TextField
        id={id}
        name='name'
        labelText='Input or edit TKDN percentage here'
        type='number'
        margin='normal'
        fullWidth
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  )
}

export default FormRow
