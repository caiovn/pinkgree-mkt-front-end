import { Carousel } from '@/components/index'
import ProductCard from '@/components/ProductCard/ProductCard'
import { formState as recoilFormState } from '@/components/States/Atoms'
import { Table } from '@/components/Table'
import Button from '@/components/Button'
import { convertToBRLCurrency } from '@/utils/currency'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import useFetch from '../../hooks/useFetch'
import styles from './product.module.scss'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { BASE_URL } from '@/constants/api'

const ProductPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const router = useRouter()
  const { slug } = router.query
  const { 0: productId, 1: skuCode } = slug
  const setFormState = useSetRecoilState(recoilFormState)
  const [isFavorite, setIsFavorite] = useState(false)

  const {
    data: product,
    loading,
    error,
  } = useFetch<any>(
    'GET',
    skuCode ? `sku/${skuCode}` : `sku/product_skus/${productId}`
  )

  useEffect(() => {
    console.log(keycloak)
    if (keycloak.authenticated && product)
      fetch(
        `${BASE_URL}/favorite/product/${productMain?.skuCode}/user/${keycloak?.tokenParsed.sub}`,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      ).then((response) => {
        if (response.status === 204) setIsFavorite(true)
        else setIsFavorite(false)
      })
  }, [loading])

  if (error) return <h1>Deu erro :(</h1>

  if (loading)
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )

  const productMain = skuCode ? product : product[0]
  const otherProducts = skuCode ? product.relatedSkus : product.slice(1)

  const handleClickBuy = () => {
    setFormState((oldFormState) => {
      return {
        ...oldFormState,
        step: 0,
        values: {
          ...oldFormState.values,
          productList: [
            // ...oldFormState.values.productList,
            {
              name: productMain.name,
              price: productMain.price,
              stockQuantity: productMain.stockQuantity,
              skuCode: productMain.skuCode,
              quantity: 1,
              image: productMain.mainImageUrl,
            },
          ],
        },
      }
    })

    router.push('/buy')
  }

  const handleChangeFavorite = (isAdition) => {
    if(isAdition) {
      fetch(`${BASE_URL}/favorite/product/${productMain.skuCode}/user/${keycloak?.tokenParsed.sub}`, { 
        method: 'POST',
        headers: {
        Authorization: `Bearer ${keycloak.token}`,    
        }
      }).then((response) => {
        if(response.status === 201) {
          setIsFavorite(true)
        }
      })
    } else {
      fetch(`${BASE_URL}/favorite/product/${productMain.skuCode}/user/${keycloak?.tokenParsed.sub}`, { 
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${keycloak.token}`,    
        }
      }).then((response) => {
        if (response.status === 204) {
          setIsFavorite(false)
        }
      })
    }
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
      <div>
        <h2 className={styles.name}>{productMain.name}</h2>
        <p className={styles.price}>
          {convertToBRLCurrency.format(productMain.price.listPrice)}
        </p>
        <div className={styles.buttonContainer}>
          <Button onClick={handleClickBuy} color="green">
            Comprar agora
          </Button>
          <button className={styles.favoriteButton} onClick={() => handleChangeFavorite(!isFavorite)}>
            {isFavorite ? (
              <i className="fa-solid fa-heart"></i>
              ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </button>
        </div>
      </div>
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
