import Link from 'next/link'
import styles from './BottomNavbar.module.scss'
import { NAVBAR_ITEMS } from './constants/navbarItems'

const BottomNavbar = () => {
  return (
    <nav className={styles.container}>
      {NAVBAR_ITEMS.map((item, index) => (
        <Link key={index} href={item.path}>
          <a className={styles.navbarItem}>
            {item.icon && <i className={`${styles.icon} ${item.icon}`} />}
            <strong>{item.name}</strong>
          </a>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNavbar
