import Loading from '@/components/Loading'
import ProductOrderCard from '@/components/ProductOrderCard/ProductOrderCard'
import Stepper from '@/components/Stepper/Stepper'
import PAYMENT_FORM from '@/constants/paymentForm'
import { convertToBRLCurrency } from '@/utils/currency'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useFetch from 'src/hooks/useFetch'
import withAuth from 'src/hooks/withAuth'
import styles from './orders.module.scss'

interface OrderProps {
  createdAt: string
  updatedAt: string
  id: number
  status: string
  history: {
    status: string
    orderId: number
    createdAt: Date
    updatedAt: Date
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
    height: number
    length: number
    mainImageUrl: string
    name: string
    price: number
    quantity: number
    skuCode: string
    weight: number
    width: number
    urlImages: []
    skuAttributes: {
      label: string
      type: string
      value: string
    }[]
  }[]
  shippingData: {
    address: Address
    deliveryDays: number
    freightPrice: number
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

  const address = order?.shippingData?.address

  const formattedAddress = useMemo(
    () =>
      `${address?.street} ${address?.number} ${address?.neighborhood} ${address?.city}, ${address?.state} ${address?.zipcode} - ${address?.country}`,
    [address]
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
        <h1>Pedido.</h1>
        <h2>Número de pedido: {order.id}</h2>
      </div>
      <div>
        <ProductOrderCard
          id={1}
          skuCode={order.productList[0].skuCode}
          name={order.productList[0].name}
          price={order.productList[0].price}
          mainImageUrl={order.productList[0].mainImageUrl}
          quantity={order.productList[0].quantity}
          deliveryDays={order.shippingData.deliveryDays}
          freightPrice={order.shippingData.freightPrice}
        />
      </div>
      <div>
        <h2>Endereço</h2>
        <span>{formattedAddress}</span>
      </div>
      {order.paymentData ? (
        <div className={styles.paymentMethodWrapper}>
          <h2>Forma de pagamento</h2>
          <span>{PAYMENT_FORM[order.paymentData.paymentMethod]}</span>
          <div className={styles.paymentDetails}>
            <span>
              **** **** **** {order.paymentData.paymentProperties.last4}
            </span>
            <span>{convertToBRLCurrency.format(order.paymentData.amount)}</span>
          </div>
          {/* <p>Data val: {order.paymentData.paymentProperties.validationDate}</p> */}
        </div>
      ) : (
        <div>
          <h2>Pagamento</h2>
          <span>Pagamento em processamento.</span>
        </div>
      )}
      {order.history && (
        <div>
          <h2>Status do pedido</h2>
          <Stepper steps={order.history} />
        </div>
      )}
    </div>
  )
}

export default withAuth(Orders)
