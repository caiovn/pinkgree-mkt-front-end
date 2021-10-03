import { Carousel } from '@/components/index'
import { Table } from '@/components/Table'
import { convertToBRLCurrency } from '@/utils/currency'
import { useRouter } from 'next/router'
import useFetch from '../../hooks/useFetch'
import styles from './product.module.scss'

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: product, loading } = useFetch<ISku[]>(
    'GET',
    `sku/product_skus/${id}`
  )

  if (loading) return <span>loading...</span>

  return (
    <div>
      <div className={styles.carousel}>
        <Carousel
          settings={{
            dots: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: false,
          }}
        >
          <div className={styles.imageContainer}>
            <img src={product[0].mainImageUrl} alt={product[0].name} />
          </div>
          {product[0].urlImages.map((image, index) => (
            <div className={styles.imageContainer} key={`carousel-${index}`}>
              <img src={image} alt="ooo" />
            </div>
          ))}
        </Carousel>
      </div>
      <h2 className={styles.name}>{product[0].name}</h2>
      <p className={styles.price}>
        {convertToBRLCurrency.format(product[0].price.listPrice)}
      </p>
      {product[0].skuAttributes.length > 0 && (
        <details open>
          <summary>Ficha técnica</summary>
          <div className={styles.productDetailContainer}>
            <Table skuAttributes={product[0].skuAttributes} />
          </div>
        </details>
      )}
      <details open>
        <summary>Dimensões</summary>
        <div className={styles.productDetailContainer}>
          <Table
            skuAttributes={[
              { label: 'altura', type: '', value: String(product[0].height) },
            ]}
          />
        </div>
      </details>
    </div>
  )
}

export default ProductPage
