import styles from './CategoryCard.module.css';
import Link from 'next/link'

export default function CategoryCard({name, id, image}) {
  return (
    <div className={styles.cardContainer}>
      <Link href={`/category/${id}`}>
        <a id={`category-${id}`} tabIndex={0}>
          <div className={styles.categoryImage} style={{backgroundImage: `url(${image})`}}/>
          <div className={styles.root}>
            {name}
          </div>
        </a>
      </Link>
    </div>
  );
}
