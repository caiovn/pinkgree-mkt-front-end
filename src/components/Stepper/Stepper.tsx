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
  ORDER_CREATED: 'Pedido criado',
  PAYMENT_CONFIRMED: 'Pagamento confirmado',
  ORDER_STOCK_RESERVED: 'Estoque do pedido reservado'
}

const Stepper = ({ steps }: StepperProps) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <>
          <div className={styles.stepperWrapper}>
            <div className={styles.stepperCount}>{index + 1}</div>
            <span className={styles.stepperText}>{ORDER_STATUS[step.status]}</span>
          </div>
          <div className={styles.stepperDivider} />
        </>
      ))}
    </div>
  )
}

export default Stepper
