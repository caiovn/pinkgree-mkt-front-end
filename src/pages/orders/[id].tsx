import Loading from '@/components/Loading'
import PAYMENT_FORM from '@/constants/paymentForm'
import { convertToBRLCurrency } from '@/utils/currency'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import useFetch from 'src/hooks/useFetch'
import withAuth from 'src/hooks/withAuth'

interface OrderProps {
  createdAt: string
  updatedAt: string
  id: number
  status: string
  history: {
    status: string
    orderId: number
    createdAt: string
    updatedAt: string
  }[]
  paymentData: {
    amount: number
    paymentMethod: string
    paymentAddress: Address
    paymentProperties: {
      document: string
      email: string
      last4: string
      phone: string
      validationDate: string
    }
  }
  productList: {
    height: number,
    length: number,
    mainImageUrl: string,
    name: string,
    price: number,
    quantity: number,
    skuCode: string,
    weight: number,
    width: number,
    urlImages: [],
    skuAttributes: {
      label: string,
      type: string,
      value: string,
    }[]
  }[],
  shippingData: {
    address: Address,
    deliveryDays: number,
    freightPrice: number,
  }
}

const Orders = () => {
  const router = useRouter()
  const { id } = router.query
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const { data: order, loading } = useFetch<OrderProps>(
    'GET',
    `order/${id}`,
    new Headers({ Authorization: `Bearer ${keycloak.token}` })
  )

  console.log(order)

  if (loading)
    return (
      <div className="loading-container">
        <Loading />
      </div>
    )

  return (
    <div>
      <div>
        <span>Esse é o seu número de pedido: {order.id}</span>
      </div>
      <div>
        <p>
          Forma de pagamento: {PAYMENT_FORM[order.paymentData.paymentMethod]}
        </p>
        <p>**** **** **** {order.paymentData.paymentProperties.last4}</p>
        <p>Data val: {order.paymentData.paymentProperties.validationDate}</p>
        <p>Valor total: {convertToBRLCurrency.format(order.paymentData.amount)}</p>
      </div>
    </div>
  )
}

export default withAuth(Orders)
