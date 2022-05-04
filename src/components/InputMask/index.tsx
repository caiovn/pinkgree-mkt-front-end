import { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'
import { masks } from './constants'
import styles from './InputMask.module.scss'

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'cpf' | 'cep' | 'telephone'
  label?: string
  errorMessage?: string
  register: any
}

export default function InputMask({
  mask,
  label,
  errorMessage,
  register,
  type,
}: InputMaskProps) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <ReactInputMask
        type={type}
        mask={masks[mask]}
        maskChar={null}
        className={styles.input}
        {...register}
      />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}
