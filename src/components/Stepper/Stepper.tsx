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
  const lastItemIndex = steps.length - 1;

  const addFutureFlow = (lastItem: string) => {
    const reversedRegularFlow = regularFlow.slice().reverse()
    const futureFlowIndex = reversedRegularFlow.findIndex((status) => {
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
          <div className={styles.stepperWrapper} key={index}>
            <div className={styles.stepperCount}>{index + 1}</div>
            <span className={styles.stepperText}>
              {ORDER_STATUS[step.status]}
            </span>
          </div>
          <div className={styles.stepperDivider} />
        </>
      ))}
      {addFutureFlow(steps[lastItemIndex].status).map((step, index) => {
        const futureIndex = steps.length + index + 1
        
        return (
          <>
            <div className={styles.stepperWrapper} key={futureIndex}>
              <div className={`${styles.stepperCount} ${styles.disabled}`}>{futureIndex}</div>
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
