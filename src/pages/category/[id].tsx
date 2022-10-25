import ProductCard from '@/components/ProductCard/ProductCard'
import { useRouter } from 'next/router'
import useFetch from 'src/hooks/useFetch'
import { IProduct } from 'src/types'

const Category = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: products } = useFetch<IProduct[]>(
    'GET',
    `product/category/${id}`
  )

  return (
    <div>
      <h1>Categorias.</h1>
      {products &&
        products.map((product) => {
          if (!product.active) return
          return <ProductCard key={product.id} {...product} />
        })}
    </div>
  )
}

export default Category
