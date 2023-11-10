'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from 'src/store/apps/product'

import SearchContainer from 'src/pages/apps/product/view/searchContainer'
import NoData from 'src/common/NoData'
import ProductListCard from './list/ProductListCard'

import ProductListGrid from './list/ProductListGrid'

// import Spinner from 'src/@core/components/spinner'

const ProductsContainer = () => {
  const { allProducts, searchCategory, searchQuery, loading } = useSelector(state => state.product)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProduct({ searchCategory, searchQuery }))
  }, [dispatch, searchCategory, searchQuery])

  // if (loading) return <Spinner sx={{ height: '100%' }} />

  const totalProduct = allProducts.length

  if (allProducts && allProducts.length > 0) {
    return (
      <>
        <SearchContainer />
        <ProductListGrid allProducts={allProducts} totalProduct={totalProduct} />
      </>
    )
  } else {
    return (
      <>
        <SearchContainer />
        <NoData />
      </>
    )
  }
}

export default ProductsContainer
