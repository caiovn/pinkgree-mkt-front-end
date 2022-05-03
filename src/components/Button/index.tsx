import styles from './Button.module.scss'

interface ButtonProps {
  color?: string
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  children: any
}

const Button = ({ color = 'black', type = "button", onClick, children }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{ background: color }}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
