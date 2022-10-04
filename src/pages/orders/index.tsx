import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import useFetch from "src/hooks/useFetch"
import withAuth from "src/hooks/withAuth"
import { Order } from "src/types"

const Orders = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>()

    //TODO: Adicionar header de authorization
    const { data: orders } = useFetch<Order[]>(
        'GET',
        `order/customer/${keycloak.tokenParsed.sub}`
    )

    return (
        <h1>Meus pedidos</h1>
    )
}

export default withAuth(Orders)
