import React, { InputHTMLAttributes } from 'react'
import styles from './RadioButton.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: any
  errorMessage?: string
}

export default function RadioButton({
  id,
  label,
  value,
  min,
  max,
  maxLength,
  pattern,
  required,
  register,
  name,
  errorMessage,
  placeholder,
  width,
}: InputProps) {
  return (
    <div>
      <input
        id={id}
        // className={styles.input}
        type="radio"
        value={value}
        min={min}
        max={max}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        placeholder={placeholder}
        name={name}
        {...register}
      />
      {label && <label className={styles.label}>{label}</label>}
    </div>
  )
}
