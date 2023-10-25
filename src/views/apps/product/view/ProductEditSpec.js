import { useState, useEffect, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import InputLabel from '@mui/material/InputLabel'

import FormControl from '@mui/material/FormControl'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { editProductSpec, getProductSpec } from 'src/store/apps/productSpec'

const ProductEditSpec = ({ item_cd, expired_at, ...initialData }) => {
  const dispatch = useDispatch()
  const [editedData, setEditedData] = useState(initialData)
  const [editedItem_cd, setEditedItem_cd] = useState(item_cd)

  const [newExpired_at, setNewExpired_at] = useState(expired_at)

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setEditedData({ ...editedData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    try {
      dispatch(
        editProductSpec({
          item_cd: editedItem_cd,
          productSpec: {
            expired_at: newExpired_at,
            ...editedData // Menggunakan editedData untuk bidang lainnya
          }
        })
      )
      dispatch(getProductSpec({ item_cd: editedItem_cd }))
    } catch (error) {
      console.error('Edit failed:', error)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} autoComplete='off' noValidate>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontSize: '0.7rem' }}>
                <TextField
                  name='construction'
                  fullWidth
                  defaultValue={initialData.construction}
                  label='Construction'
                  multiline
                  onChange={handleChange}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='dimension'
                fullWidth
                defaultValue={initialData.dimension}
                label='Dimension'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='position'
                fullWidth
                defaultValue={initialData.position}
                label='Position'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name='base' fullWidth defaultValue={initialData.base} label='Base' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='basePlate'
                fullWidth
                defaultValue={initialData.basePlate}
                label='Base Plate'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='bodyFrame'
                fullWidth
                defaultValue={initialData.bodyFrame}
                label='Body Frame'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='bodyFrameWork'
                fullWidth
                defaultValue={initialData.bodyFrameWork}
                label='Body Framework'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='cover'
                fullWidth
                defaultValue={initialData.cover}
                label='Cover'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='coverMaterial'
                fullWidth
                defaultValue={initialData.coverMaterial}
                label='Cover Material'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='material'
                fullWidth
                defaultValue={initialData.material}
                label='Material '
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='mattress                      '
                fullWidth
                multiline
                defaultValue={initialData.mattress}
                label='Mattress'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='mattressSize'
                fullWidth
                defaultValue={initialData.mattressSize}
                label='Mattress size'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='mattressThickness'
                fullWidth
                defaultValue={initialData.mattressThickness}
                label='Mattress Thickness'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='footandheadPanel'
                fullWidth
                defaultValue={initialData.footandheadPanel}
                label='Head and Foot panel'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='pillowthecorpse'
                fullWidth
                defaultValue={initialData.pillowthecorpse}
                label='Pillow the Corpse'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name='foot' fullWidth defaultValue={initialData.foot} label='Foot' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='footWear'
                fullWidth
                defaultValue={initialData.footWear}
                label='Foot Wear'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='foodTray'
                fullWidth
                defaultValue={initialData.foodTray}
                label='Foot Tray'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='custodyFeet'
                fullWidth
                defaultValue={initialData.custodyFeet}
                label='Custody Feet'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name='door' fullWidth defaultValue={initialData.door} label='Door' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='drawer'
                fullWidth
                defaultValue={initialData.drawer}
                label='Drawer'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField name='top' fullWidth defaultValue={initialData.top} label='Top' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField name='size' fullWidth defaultValue={initialData.size} label='Size' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='weight'
                fullWidth
                defaultValue={initialData.weight}
                label='Weight'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='loadCapacity'
                fullWidth
                defaultValue={initialData.loadCapacity}
                label='Load Capacity'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                name='maxLoad'
                fullWidth
                defaultValue={initialData.maxLoad}
                label='Max Load'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                name='powerConsumption'
                fullWidth
                defaultValue={initialData.powerConsumption}
                label='Power Consumption'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                name='powerSupply'
                fullWidth
                defaultValue={initialData.powerSupply}
                label='Power Supply'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <TextField
                name='inputVoltage'
                fullWidth
                defaultValue={initialData.inputVoltage}
                label='Input Voltage'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3} sm={2}>
              <TextField
                name='outputVoltage'
                fullWidth
                defaultValue={initialData.outputVoltage}
                label='Output Voltage'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField name='lamp' fullWidth defaultValue={initialData.lamp} label='Lamp' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='lightPole'
                fullWidth
                defaultValue={initialData.lightPole}
                label='Light Pole'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                name='ivStand'
                fullWidth
                defaultValue={initialData.ivStand}
                label='I.V Stand'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='foundationTray'
                fullWidth
                defaultValue={initialData.foundationTray}
                label='Foundation Tray'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='handle'
                fullWidth
                defaultValue={initialData.handle}
                label='Handle'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='handleTrolley'
                fullWidth
                defaultValue={initialData.handleTrolley}
                label='Handle Trolley'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                name='sideGuard'
                fullWidth
                defaultValue={initialData.sideGuard}
                label='Side Guard'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                name='sideRail'
                fullWidth
                defaultValue={initialData.sideRail}
                label='Side Rail'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='systemControl'
                fullWidth
                defaultValue={initialData.systemControl}
                label='System control'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='systemFilter'
                fullWidth
                defaultValue={initialData.systemFilter}
                label='System filter'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='temperatureControl'
                fullWidth
                defaultValue={initialData.temperatureControl}
                label='Temperature Control'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='standSize'
                fullWidth
                defaultValue={initialData.standSize}
                label='Stand Size'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                name='medicineBox'
                fullWidth
                defaultValue={initialData.medicineBox}
                label='Medicine Box'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='wheels'
                fullWidth
                defaultValue={initialData.wheels}
                label='Wheels'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name='movers'
                fullWidth
                defaultValue={initialData.movers}
                label='Movers'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField name='pole' fullWidth defaultValue={initialData.pole} label='Pole' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                name='sterilizing'
                fullWidth
                defaultValue={initialData.sterilizing}
                label='Sterilizing'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField name='rim' fullWidth defaultValue={initialData.rim} label='Rim' onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='traycorpse'
                fullWidth
                defaultValue={initialData.traycorpse}
                label='Tray Corpse'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='typeScreen'
                fullWidth
                defaultValue={initialData.typeScreen}
                label='Type Screen'
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                name='underPressure'
                fullWidth
                defaultValue={initialData.underPressure}
                label='Under Pressure'
                onChange={handleChange}
              />
            </Grid> */}

            <Grid item xs={6} sm={3}>
              <TextField
                name='tkdn_pctg'
                fullWidth
                type='number'
                defaultValue={initialData.tkdn_pctg}
                label='TKDN %'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name='bmp_pctg'
                fullWidth
                type='number'
                defaultValue={initialData.bmp_pctg}
                label='BMP %'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name='tkdn_value'
                fullWidth
                type='number'
                defaultValue={initialData.tkdn_value}
                label='TKDN Value'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name='bmp_value'
                fullWidth
                type='number'
                defaultValue={initialData.bmp_value}
                label='BMP Value'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='spec-underpressure'>Under Pressure</InputLabel>
                <Select
                  fullWidth
                  label='Under Pressure'
                  name='underPressure'
                  onChange={handleChange}
                  value={editedData.underPressure}
                >
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                name='filter'
                fullWidth
                defaultValue={initialData.filter}
                label='Filter'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name='finishing'
                fullWidth
                defaultValue={initialData.finishing}
                label='Finishing'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='accessories'
                fullWidth
                defaultValue={initialData.accessories}
                label='Accessories'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='remarks'
                fullWidth
                multiline
                minRows={2}
                defaultValue={initialData.remarks}
                onChange={handleChange}
                label='Remarks'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <ReactDatePicker
                  showYearDropdown
                  showMonthDropdown
                  selected={newExpired_at ? new Date(newExpired_at) : null}
                  name='expired_at'
                  id='expired_at'
                  onChange={newExpired_at => setNewExpired_at(newExpired_at)}
                  placeholderText='Click to select a date'
                  dateFormat={'dd MMM yyyy'}
                  customInput={<TextField label='Expired at' />}
                />
              </DatePickerWrapper>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button variant='contained' onClick={handleSubmit}>
          Simpan
        </Button>
      </CardActions>
    </Card>
  )
}
export default ProductEditSpec
