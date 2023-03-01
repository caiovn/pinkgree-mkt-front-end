import Head from 'next/head'
import { useEffect } from 'react'
import withAuth, { AuthenticatedPageProps } from 'src/hooks/withAuth'
import ROLES from '@/constants/roles'
import useFetch from 'src/hooks/useFetch'
import Loading from '@/components/Loading'
import { convertToBRLCurrency } from '@/utils/currency'
import Button from '@/components/Button'
import styles from './catalog-administration.module.scss'
import { useRouter } from 'next/router'

const catalogAdministration = ({ keycloak }: AuthenticatedPageProps) => {
  const router = useRouter()
  const userRoles = keycloak.realmAccess.roles

  const { data: productsList, loading: loadingProducts } = useFetch<IProduct[]>(
    'GET',
    'product'
  )
  // const { data: SKUList, loading: loadingSKUs } = useFetch<IProduct[]>(
  //   'GET',
  //   'sku'
  // )

  const userHasResourceAccess = (resource: string) => {
    if (userRoles.includes(resource)) return true
    return false
  }

  const editProduct = (productId: number) => {
    router.push(`/catalog-administration/edit-product/${productId}`)
  }

  if (loadingProducts) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>Adminstração de catálogo.</title>
      </Head>
      <>
        <h1>Adminstração de catálogo</h1>
        <div>
          {userHasResourceAccess(ROLES.CATALOG_ADMIN_ROLES.CREATE_PRODUCT) && (
            <Button>Registrar Produto</Button>
          )}
          {userHasResourceAccess(ROLES.CATALOG_ADMIN_ROLES.UPDATE_PRODUCT) && (
            <div className={styles.tableWrapper}>
              <table>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Ativo</th>
                  <th>Ação</th>
                </tr>
                {productsList.map((product) => {
                  return (
                    <tr>
                      <td>{product.name}</td>
                      <td>{convertToBRLCurrency.format(product.price)}</td>
                      <td>{product.brand.name}</td>
                      <td>
                        {product.categories.map((product) => product.name)}
                      </td>
                      <td>{product.active ? 'Sim' : 'Não'}</td>
                      <td>
                        <Button onClick={() => editProduct(product.id)}>
                          Editar
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </table>
            </div>
          )}
        </div>
        <div>
          {userHasResourceAccess(ROLES.CATALOG_ADMIN_ROLES.CREATE_SKU) && (
            <Button>Registrar SKU</Button>
          )}
          {userHasResourceAccess(ROLES.CATALOG_ADMIN_ROLES.UPDATE_SKU) && (
            <div>
              <span>edição de SKU</span>
            </div>
          )}
        </div>
      </>
    </>
  )
}

export default withAuth(catalogAdministration)
