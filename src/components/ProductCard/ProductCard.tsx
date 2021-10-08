import ROUTES from '@/routes/routes'
import { convertToBRLCurrency } from '@/utils/currency'
import Link from 'next/link'
import styles from './ProductCard.module.scss';

const ProductCard = ({ id, skuCode = '', name, price, mainImageUrl }: IProduct) => {
  return (
    // <Link>
      <a href={`${ROUTES.PRODUCT_PAGE}/${id}/${skuCode}`}>
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
    // </Link>
  )
}

export default ProductCard
