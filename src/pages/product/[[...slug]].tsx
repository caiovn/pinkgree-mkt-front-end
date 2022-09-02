import { Carousel } from '@/components/index'
import ProductCard from '@/components/ProductCard/ProductCard'
import { formState, productState } from '@/components/States/Atoms'
import { Table } from '@/components/Table'
import Button from '@/components/Button'
import { convertToBRLCurrency } from '@/utils/currency'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import useFetch from '../../hooks/useFetch'
import styles from './product.module.scss'

const ProductPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const setProduct = useSetRecoilState(productState)
  const getProduct = useRecoilValue(productState)
  const setFormState = useSetRecoilState(formState)
  const getFormState = useRecoilState(formState)
  const { 0: productId, 1: skuCode } = slug
  const { data: product, loading } = useFetch<any>(
    'GET',
    skuCode ? `sku/${skuCode}` : `sku/product_skus/${productId}`
  )

  if (loading) return <span>loading...</span>

  const productMain = skuCode ? product : product[0]
  const otherProducts = skuCode ? product.relatedSkus : product.slice(1)


  const handleClickBuy = () => {
    setProduct(productMain)
    setFormState((oldFormState) => {
      return {
        ...oldFormState,
        step: 0
      }
    })
    router.push('/buy')
  }

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
            <img src={productMain.mainImageUrl} alt={productMain.name} />
          </div>
          {productMain.urlImages.map((image, index) => (
            <div className={styles.imageContainer} key={`carousel-${index}`}>
              <img src={image} alt="ooo" />
            </div>
          ))}
        </Carousel>
      </div>
      <h2 className={styles.name}>{productMain.name}</h2>
      <p className={styles.price}>
        {convertToBRLCurrency.format(productMain.price.listPrice)}
      </p>
      <Button onClick={handleClickBuy} color="green">Comprar agora</Button>
      <div>
        {otherProducts && otherProducts.length > 0 && (
          <>
            <h2>Relacionados.</h2>
            <Carousel settings={{ adaptiveHeight: true, dots: true }}>
              {otherProducts.map((oProduct) => {
                return (
                  <div className={styles.otherProductContainer}>
                    <ProductCard
                      id={Number(productId)}
                      skuCode={oProduct.skuCode}
                      name={oProduct.name}
                      price={oProduct.price.listPrice}
                      mainImageUrl={oProduct.mainImageUrl}
                    />
                  </div>
                )
              })}
            </Carousel>
          </>
        )}
      </div>
      {productMain.skuAttributes.length > 0 && (
        <details open>
          <summary>Ficha técnica</summary>
          <div className={styles.productDetailContainer}>
            <Table skuAttributes={productMain.skuAttributes} />
          </div>
        </details>
      )}
      <details open>
        <summary>Dimensões</summary>
        <div className={styles.productDetailContainer}>
          <Table
            skuAttributes={[
              { label: 'altura', type: '', value: String(productMain.height) },
            ]}
          />
        </div>
      </details>
    </div>
  )
}

export default ProductPage
