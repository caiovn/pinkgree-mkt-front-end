import ProductCard from '@/components/ProductCard/ProductCard'
import ROUTES from '@/routes/routes'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import useFetch from 'src/hooks/useFetch'
import withAuth from 'src/hooks/withAuth'

const Orders = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const { data: orders } = useFetch<Order[]>(
    'GET',
    `order/customer/${keycloak.tokenParsed.sub}`,
    new Headers({ Authorization: `Bearer ${keycloak.token}` })
  )

  return (
    <>
      <h1>Meus pedidos</h1>
      {orders?.length > 0 ?
        orders.map((order) => {
          console.log(order)
          return (
            <div key={`${order.id}`}>
              <ProductCard
                id={order.id}
                name={order.productList[0].name}
                mainImageUrl={order.productList[0].mainImageUrl}
                price={order.productList[0].price}
                href={`${ROUTES.ORDERS}/${order.id}`}
              />
            </div>
          )
        })
      : (
        <span>Nenhum pedido feito ainda :(</span>
      )}
    </>
  )
}

export default withAuth(Orders)
