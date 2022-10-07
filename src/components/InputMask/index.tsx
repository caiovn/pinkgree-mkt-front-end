import { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'
import { Mask } from 'src/types'
import { masks } from './constants'
import styles from './InputMask.module.scss'

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: Mask
  label?: string
  errorMessage?: any
  register?: any
}

export default function InputMask({
  mask,
  label,
  errorMessage,
  register,
  type,
  disabled,
}: InputMaskProps) {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.messageWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
      <ReactInputMask
        type={type}
        mask={masks[mask]}
        maskChar={null}
        className={styles.input}
        disabled={disabled}
        {...register}
      />
    </div>
  )
}
