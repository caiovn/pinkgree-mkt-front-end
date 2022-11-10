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
import StarRatings from 'react-star-ratings'

const ProductPage = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const router = useRouter()
  const { slug } = router.query
  const { 0: productId, 1: skuCode } = slug
  const setFormState = useSetRecoilState(recoilFormState)
  const [isFavorite, setIsFavorite] = useState(false)
  const [ratings, setRatings] = useState<IRating>()

  const {
    data: product,
    loading,
    error,
  } = useFetch<any>(
    'GET',
    skuCode ? `sku/${skuCode}` : `sku/product_skus/${productId}`
  )

  useEffect(() => {
    if (keycloak.authenticated && product) {
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

      if (productMain?.skuCode) {
        fetch(`${BASE_URL}/evaluations/product/${productMain.skuCode}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${keycloak.token}`,
          },
        })
          .then((result) => result.json())
          .then((data) => {
            setRatings(data)
          })
      }
    }
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
    if (keycloak.authenticated) {
      if (isAdition) {
        fetch(
          `${BASE_URL}/favorite/product/${productMain.skuCode}/user/${keycloak?.tokenParsed.sub}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          }
        ).then((response) => {
          if (response.status === 201) {
            setIsFavorite(true)
          }
        })
      } else {
        fetch(
          `${BASE_URL}/favorite/product/${productMain.skuCode}/user/${keycloak?.tokenParsed.sub}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          }
        ).then((response) => {
          if (response.status === 204) {
            setIsFavorite(false)
          }
        })
      }
    } else {
      keycloak?.login()
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
          <button
            className={styles.favoriteButton}
            onClick={() => handleChangeFavorite(!isFavorite)}
          >
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
      <div>
        <h2>Avaliações</h2>
        <div>
          <div>
            <p>Avaliação média</p>
            <StarRatings
              rating={ratings?.average}
              starDimension="40px"
              starRatedColor="#F7B32B"
              starHoverColor="#F7B32B"
              starEmptyColor="#605F5E"
            />
          </div>
          <p>{ratings?.count} avaliações</p>
          <div>
            {ratings?.data.length > 0 ? (
              ratings.data.map((rating, index) => (
                <div key={index} className={styles.costumerRatingWrapper}>
                  <div className={styles.starRatingComponent}>
                    <StarRatings
                      rating={rating.stars}
                      starDimension="24px"
                      starRatedColor="#F7B32B"
                      starHoverColor="#F7B32B"
                      starEmptyColor="#605F5E"
                    />
                  </div>
                  <div className={styles.commentRatingWrapper}>
                    <div className={styles.ratingAuthor}>
                      <span>"{rating.title}"</span>&nbsp;
                      <span>- {rating.customer.name}</span>
                    </div>
                    <span>{rating.evaluation}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>Sem avaliações :(</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
