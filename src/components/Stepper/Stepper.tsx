import styles from './Stepper.module.scss'

interface StepperProps {
  steps: {
    createdAt: Date
    orderId: number
    status: string
    updatedAt: Date
  }[]
}

const ORDER_STATUS = {
  ORDER_CANCELED: 'Pedido cancelado',
  ORDER_SHIPPED: 'Pedido entregue',
  ORDER_EN_ROUTE: 'Pedido em rota de entrega',
  ORDER_IN_SEPARATION: 'Pedido em separação',
  ORDER_STOCK_FAILED: 'Falha na reserva de estoque',
  ORDER_STOCK_RESERVED: 'Estoque reservado',
  PAYMENT_CONFIRMED: 'Pagamento confirmado',
  ORDER_CREATED: 'Pedido criado ',
}

const regularFlow = [
  'ORDER_CREATED',
  'PAYMENT_CONFIRMED',
  'ORDER_STOCK_RESERVED',
  'ORDER_IN_SEPARATION',
  'ORDER_EN_ROUTE',
  'ORDER_SHIPPED',
]

const Stepper = ({ steps }: StepperProps) => {
  const addFutureFlow = (lastItem: string) => {
    const reversedRegularFlow = regularFlow.reverse()
    const futureFlowIndex = reversedRegularFlow.findIndex((status) => {
      console.log(status, lastItem)
      return status === lastItem
    })
  
    if (futureFlowIndex != -1) {
      return reversedRegularFlow.splice(0, futureFlowIndex).reverse()
    }
  
    return []
  }

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <>
          <div className={styles.stepperWrapper}>
            <div className={styles.stepperCount}>{index + 1}</div>
            <span className={styles.stepperText}>
              {ORDER_STATUS[step.status]}
            </span>
          </div>
          <div className={styles.stepperDivider} />
        </>
      ))}
      {addFutureFlow(steps.at(-1).status).map((step, index) => {
        return (
          <>
            <div className={styles.stepperWrapper}>
              <div className={`${styles.stepperCount} ${styles.disabled}`}>{steps.length + index + 1}</div>
              <span className={styles.stepperText}>{ORDER_STATUS[step]}</span>
            </div>
            <div className={styles.stepperDivider} />
          </>
        )
      })}
    </div>
  )
}

export default Stepper
