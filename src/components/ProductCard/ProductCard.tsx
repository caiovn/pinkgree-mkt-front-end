import Image from 'next/image'
import React from 'react'
import ROUTES from '@/routes/routes'
import { convertToBRLCurrency } from '@/utils/currency'
import Link from 'next/link'
import styles from './ProductCard.module.scss'

const ProductCard = ({
  id,
  skuCode = '',
  name,
  price,
  mainImageUrl,
}: IProduct) => {
  console.log(mainImageUrl)
  return (
    // <Link>
    <a href={`${ROUTES.PRODUCT_PAGE}/${id}/${skuCode}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          {mainImageUrl && (
            <Image
              src={`${mainImageUrl}`}
              alt={name}
              width="200"
              height="200"
            />
          )}
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
