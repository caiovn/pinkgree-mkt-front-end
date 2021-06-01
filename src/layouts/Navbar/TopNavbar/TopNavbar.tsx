import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <button className={styles.buttonWrapper}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <span className={styles.logo}>Pinkgreen.</span>
      <button className={styles.buttonWrapper}>
        <i className="fas fa-shopping-bag"></i>
      </button>
    </div>
  );
}

export default TopNavbar;
