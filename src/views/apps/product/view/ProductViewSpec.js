// ** React Imports
import { useState } from 'react'

// ** MUI Imports

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import ProductEditSpec from './ProductEditSpec'

const ProductViewSpec = ({
  item_cd,
  item_type,
  item_model,
  expired_at,
  construction,
  mattressSize,
  mattressThickness,
  finishing,
  dimension,
  powerSupply,
  loadCapacity,
  systemFilter,
  accessories,
  sideRail,
  ivStand,
  wheels,
  maxLoad,
  size,
  weight,
  standSize,
  position,
  panelHeadandFeet,
  base,
  basePlate,
  cover,
  material,
  coverMaterial,
  typeScreen,
  powerConsumption,
  lamp,
  movers,
  rim,
  custodyFeet,
  foot,
  footWear,
  pole,
  inputVoltage,
  outputVoltage,
  sideGuard,
  footandheadPanel,
  temperatureControl,
  top,
  foodTray,
  traycorpse,
  pillowthecorpse,
  lightPole,
  sterilizing,
  filter,
  bodyFrame,
  underPrisoners,
  foundationTray,
  door,
  handle,
  medicineBox,
  handleTrolley,
  drawer,
  systemControl,
  bodyFrameWork,
  mattress,
  underPressure,
  remarks,
  tkdn_pctg,
  bmp_pctg,
  bmp_value,
  tkdn_value
}) => {
  const props = {
    item_cd,
    item_type,
    item_model,
    expired_at,
    construction,
    mattressSize,
    mattressThickness,
    finishing,
    dimension,
    powerSupply,
    loadCapacity,
    systemFilter,
    accessories,
    sideRail,
    ivStand,
    wheels,
    maxLoad,
    size,
    weight,
    standSize,
    position,
    panelHeadandFeet,
    base,
    basePlate,
    cover,
    material,
    coverMaterial,
    typeScreen,
    powerConsumption,
    lamp,
    movers,
    rim,
    custodyFeet,
    foot,
    footWear,
    pole,
    inputVoltage,
    outputVoltage,
    sideGuard,
    footandheadPanel,
    temperatureControl,
    top,
    foodTray,
    traycorpse,
    pillowthecorpse,
    lightPole,
    sterilizing,
    filter,
    bodyFrame,
    underPrisoners,
    foundationTray,
    door,
    handle,
    medicineBox,
    handleTrolley,
    drawer,
    systemControl,
    bodyFrameWork,
    mattress,
    underPressure,
    remarks,
    tkdn_pctg,
    bmp_pctg,
    bmp_value,
    tkdn_value
  }

  const [collapse, setCollapse] = useState(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: [4, 4, 0] }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>Constructions : </Typography>
                  </Box>

                  <Box sx={{ mr: 10, ml: 3 }}>
                    <Typography mr='2' sx={{ fontWeight: 400, mb: 1, fontSize: '0.85rem', mr: '2' }}>
                      {construction}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  top: '-3'
                }}
              >
                <Button onClick={handleClick}>Lihat Detail</Button>
                <IconButton size='small' onClick={handleClick}>
                  <Icon fontSize='1.875rem' icon={collapse ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
                </IconButton>
              </Box>
            </CardActions>
            <Collapse in={collapse}>
              <Divider sx={{ m: '0 !important' }} />
              <ProductEditSpec {...props} />
            </Collapse>
          </Card>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </>
  )
}

export default ProductViewSpec
