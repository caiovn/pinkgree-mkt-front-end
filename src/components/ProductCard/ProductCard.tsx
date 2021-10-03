import ROUTES from '@/routes/routes'
import { convertToBRLCurrency } from '@/utils/currency'
import Link from 'next/link'
import styles from './productCard.module.scss'

const ProductCard = ({ id, name, price, mainImageUrl }: IProduct) => {
  return (
    <Link href={`${ROUTES.PRODUCT_PAGE}/${id}`}>
      <a>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img src={mainImageUrl} alt={name} className={styles.image} />
          </div>
          <div className={styles.textWrapper}>
            <h2 className={styles.productName}>{name}</h2>
            <p className={styles.price}>{convertToBRLCurrency.format(price)}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
