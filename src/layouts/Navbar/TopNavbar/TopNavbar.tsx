import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <button className={styles.buttonWrapper}>
        <i className="fas fa-chevron-left" aria-label="voltar"></i>
      </button>
      <span className={styles.logo}>Pinkgreen.</span>
      <button className={styles.buttonWrapper}>
        <i className="fas fa-shopping-bag" aria-label="carrinho"></i>
      </button>
    </div>
  );
}

export default TopNavbar;
