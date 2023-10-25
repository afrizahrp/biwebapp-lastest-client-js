import { useRouter } from 'next/router'
import ProductViewMainPage from 'src/views/apps/product/view/ProductViewMainPage'

const ProductView = () => {
  const router = useRouter()
  const item_cd = router.query
  const encodedItem_cd = encodeURIComponent(item_cd)

  return <ProductViewMainPage item_cd={item_cd} />
}

export default ProductView
