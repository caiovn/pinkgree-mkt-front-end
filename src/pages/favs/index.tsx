import ProductCard from '@/components/ProductCard/ProductCard'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Head from 'next/head'
import useFetch from 'src/hooks/useFetch'
import withAuth from 'src/hooks/withAuth'

const Favs = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const { data: skus } = useFetch<ISku[]>(
    'GET',
    `favorite/user/${keycloak.tokenParsed.sub}`,
    new Headers({ Authorization: `Bearer ${keycloak.token}` })
  )

  return (
    <>
      <Head>
        <title>Favs.</title>
      </Head>
      <>
        <h1>Favs</h1>
        {skus?.length > 0 ? (
          skus.map((sku) => {
            return (
              <ProductCard
                id={sku.product?.id}
                key={sku.skuCode}
                name={sku.name}
                mainImageUrl={sku.mainImageUrl}
                skuCode={sku.skuCode}
                price={sku.price?.listPrice}
              />
            )
          })
        ) : (
          <span>Nenhum produto adicionado aos favoritos :(</span>
        )}
      </>
    </>
  )
}

export default withAuth(Favs)
