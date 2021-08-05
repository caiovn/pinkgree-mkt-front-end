import styles from './CategoryCard.module.css';

export default function CategoryCard({ name, id }) {
  return (
    <a id={`category-${id}`} className={styles.root} tabIndex={0} href={`/category/${id}`}>
      {name}
    </a>
  );
}
