import Input from '@/components/Input'
import * as Yup from 'yup'
import Head from 'next/head'
import styles from './search.module.scss'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import useFetch from 'src/hooks/useFetch'
import { BASE_URL } from '@/constants/api'
import ProductCard from '@/components/ProductCard/ProductCard'
import Loading from '@/components/Loading'

export default function Search() {
  const [products, setProducts] = useState<IProduct[]>()
  const [loading, setLoading] = useState(true)
  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string(),
  })

  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const searchTermValue = useWatch({ control, name: 'searchTerm' })

  const { data } = useFetch(
    'GET',
    'product/search?' +
      new URLSearchParams({
        text: searchTermValue || '',
      }).toString()
  )

  useEffect(() => {
    setLoading(true)
    const delaySearch = setTimeout(() => {
      fetch(
        `${BASE_URL}/product/search?` +
          new URLSearchParams({
            text: searchTermValue || '',
          }).toString()
      )
        .then((resp) => resp.json())
        .then((data) => {
          setProducts(data)
          setLoading(false)
        })
    }, 1000)

    return () => clearTimeout(delaySearch)
  }, [searchTermValue])

  const onSubmit = () => {}

  return (
    <>
      <Head>
        <title>Search.</title>
      </Head>
      <section>
        <h1>Search</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <i className="fas fa-search"></i>
            <Input
              placeholder="Pesquisar"
              width="100%"
              register={register('searchTerm')}
            />
          </div>
        </form>
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <div>
            {products.length != 0 ? (
              <div>
                <span className={styles.resultsNumber}>
                  Total de {products.length} resultados.
                </span>
                {products.map((product) => {
                  return (
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      mainImageUrl={product.mainImageUrl}
                      price={product.price}
                      skuCode={product.skuCode}
                    />
                  )
                })}
              </div>
            ) : (
              <div className={`loading-container ${styles.notFound}`}>
                <i className="fa-solid fa-circle-xmark"></i>
                <span>Nenhum resultado.</span>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}
