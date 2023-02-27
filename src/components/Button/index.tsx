import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  bgColor?: string
}

const Button = ({
  color = 'white',
  type = 'button',
  onClick,
  disabled,
  bgColor = 'black',
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled && styles.disabled}`}
      onClick={onClick}
      style={{ background: bgColor, color: color }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
