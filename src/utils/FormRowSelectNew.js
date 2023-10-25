import { MenuItem } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import Select from '@mui/material/Select'

const FormRowSelectNew = ({ id, label, labelId, name, labelText, value, placeholder, handleChange, list }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{labelText}</InputLabel>
      <Select
        autoWidth={true}
        value={value}
        id={id}
        label={label}
        labelId={labelId}
        name={name}
        labelText={labelText || name}
        onChange={handleChange}
        inputProps={{ placeholder: { placeholder } }}
      >
        {list.map((itemValue, index) => {
          return (
            <MenuItem key={index} value={itemValue}>
              {itemValue}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default FormRowSelectNew
