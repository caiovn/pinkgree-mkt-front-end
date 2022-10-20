import Link from 'next/link'
import styles from './CategoryCard.module.scss'

export default function CategoryCard({ name, id, image, href }) {
  return (
    <div className={styles.cardContainer}>
      <Link href={href}>
        <a id={`category-${id}`} tabIndex={0}>
          <div
            className={styles.categoryImage}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={styles.root}>{name}</div>
        </a>
      </Link>
    </div>
  )
}
