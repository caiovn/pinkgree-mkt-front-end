import ROUTES from '@/routes/routes'
import Link from 'next/link'
import BottomNavbar from '../BottomNavbar/BottomNavbar'
import { NAVBAR_ITEMS } from '../BottomNavbar/constants/navbarItems'
import styles from './TopNavbar.module.scss'

const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <Link href={ROUTES.HOME}>
        <a className={styles.logo}>Pinkgreen.</a>
      </Link>
      <div className={styles.desktopLinks}>
        {NAVBAR_ITEMS.map((res) => (
          <div>
            <Link href={res.path}>{res.name}</Link>
          </div>
        ))}
      </div>
      {/* <button className={styles.buttonWrapper}>
        <i className="fas fa-shopping-bag" aria-label="carrinho" />
      </button> */}
    </div>
  )
}

export default TopNavbar
