import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import useFetch from 'src/hooks/useFetch'
import withAuth from 'src/hooks/withAuth'
import { Order } from 'src/types'

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
      {/* TODO: Criar card para exibir pedidos */}

      {orders &&
        orders.map((it) => {
          console.log(it)
          return (
          <div>
            <span>{it.productList[0].name}</span>
              <p key={`${it.id}`}>ID. {it.id}</p>
            </div>
              )
        })}
    </>
  )
}

export default withAuth(Orders)
