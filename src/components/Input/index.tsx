import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: any
  errorMessage?: string
}

const Input = ({
  id,
  label,
  type,
  value,
  min,
  max,
  maxLength,
  pattern,
  required,
  register,
  errorMessage,
}: InputProps) => {

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        min={min}
        max={max}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        {...register}
      />
      {errorMessage && (
        <div>{errorMessage}</div>
      )}
    </div>
  )
}

export default Input
