import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from 'src/store/apps/product'
import { getProductSpec } from 'src/store/apps/productSpec'

import ProductViewLeft from './productViewLeft'
import ProductViewSpec from './ProductViewSpec'

const ProductViewMainPage = ({ item_cd }) => {
  const { oneProduct } = useSelector(state => state.product)
  const { oneProductSpec } = useSelector(state => state.productSpec)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductById(item_cd))
  }, [dispatch, item_cd])

  useEffect(() => {
    dispatch(getProductSpec(item_cd))
  }, [dispatch, item_cd])

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} md={5} lg={4}> */}
      <Grid item xs={12}>
        {/* <ProductViewLeft item_cd={item_cd} /> */}
        {oneProduct.map(item => {
          return <ProductViewLeft key={item.item_cd} {...item} />
        })}
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          {oneProductSpec.map(itemSpec => {
            return <ProductViewSpec key={itemSpec.item_cd} {...itemSpec} />
          })}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductViewMainPage
