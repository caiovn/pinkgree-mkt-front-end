import { Button, Carousel, CategoryCard } from '@/components/index'
import { BASE_URL } from '@/constants/api'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { IBrand, ICategory } from 'src/types'

interface HomeProps {
  categories: Array<ICategory>
  brands: Array<IBrand>
}

const Home = ({ categories, brands }: HomeProps) => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const [name, setName] = useState('user')
  const [authenticated, setAuthenticaded] = useState<boolean>()

  useEffect(() => {
    if (keycloak.authenticated) {
      setName(keycloak.tokenParsed.name)
      setAuthenticaded(!!keycloak.authenticated)
    }
  }, [keycloak?.authenticated])

  console.log('keycloak autenticado ==> ', authenticated)

  return (
    <>
      <Head>
        <title>Pinkgreen.</title>
      </Head>
      <section>
        <div>
          <h1>Categories.</h1>
          <Carousel settings={{ variableWidth: true }}>
            {categories.map((category) => {
              return (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  id={category.id}
                  image={category.image}
                />
              )
            })}
          </Carousel>
        </div>
        <div>
          <h1>Brands.</h1>
          <Carousel settings={{ variableWidth: true }}>
            {brands.map((brand) => {
              return (
                <CategoryCard
                  key={brand.id}
                  name={brand.name}
                  id={brand.id}
                  image={
                    'https://i.kym-cdn.com/photos/images/original/001/472/727/90a.jpg'
                  }
                />
              )
            })}
          </Carousel>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const categories = await (await fetch(`${BASE_URL}/category`)).json()
  const brands = await (await fetch(`${BASE_URL}/brand`)).json()

  return { props: { categories, brands } }
}

export default Home
