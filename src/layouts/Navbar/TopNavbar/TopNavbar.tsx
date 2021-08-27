import Link from 'next/link';
import ROUTES from '@/routes/routes';
import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <Link href={ROUTES.HOME}>
        <a className={styles.logo}>Pinkgreen.</a>
      </Link>
      <button className={styles.buttonWrapper}>
        <i className="fas fa-shopping-bag" aria-label="carrinho" />
      </button>
    </div>
  );
}

export default TopNavbar;
