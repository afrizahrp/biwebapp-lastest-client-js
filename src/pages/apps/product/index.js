import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from 'src/store/apps/product'

import SearchContainer from 'src/pages/apps/product/view/searchContainer'
import NoData from 'src/common/NoData'
import ProductListCard from './list/ProductListCard'

const ProductsContainer = () => {
  const { allProducts, searchCategory, searchQuery } = useSelector(state => state.product)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getAllProduct())
  // }, [dispatch, searchCategory, searchQuery])

  useEffect(() => {
    dispatch(getAllProduct({ searchCategory, searchQuery }))
  }, [dispatch, searchCategory, searchQuery])

  const totalProduct = allProducts.length

  if (allProducts && allProducts.length > 0) {
    return (
      <>
        <SearchContainer />
        <ProductListCard allProducts={allProducts} totalProduct={totalProduct} />
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
