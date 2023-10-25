// ** React Imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { getProductSpec } from 'src/store/apps/productSpec'
import ProductEditSpec from './ProductEditSpec'

const ProductViewSpecEdit = ({ item_cd }) => {
  const { oneProductSpec } = useSelector(state => state.productSpec)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductSpec(item_cd))
  }, [dispatch, item_cd])

  const [collapse, setCollapse] = useState(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  return (
    <Grid container spacing={6}>
      {oneProductSpec.map(itemSpec => (
        <Grid item xs={12} key={item_cd}>
          <Card {...itemSpec}>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sx={{ mt: [4, 4, 0] }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>Constructions : </Typography>
                  </Box>

                  <Box sx={{ mr: 10, ml: 3 }}>
                    <Typography mr='2' sx={{ fontWeight: 400, mb: 1, fontSize: '0.85rem', mr: '2' }}>
                      {itemSpec.construction}
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
                <Button onClick={handleClick}>View Details</Button>
                <IconButton size='small' onClick={handleClick}>
                  <Icon fontSize='1.875rem' icon={collapse ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
                </IconButton>
              </Box>
            </CardActions>
            <Collapse in={collapse}>
              <Divider sx={{ m: '0 !important' }} />
              {/* <ProductEditSpec {...oneProductSpec} /> */}
              <ProductEditSpec item_cd={item_cd} expired_at={itemSpec.expired_at} initialData={oneProductSpec} />
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductViewSpecEdit
