import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
}

const Button = ({
  color = 'black',
  type = 'button',
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled && styles.disabled}`}
      onClick={onClick}
      style={{ background: color }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
