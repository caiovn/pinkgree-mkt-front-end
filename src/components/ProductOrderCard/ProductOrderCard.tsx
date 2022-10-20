import React from 'react'
import ROUTES from '@/routes/routes'
import { convertToBRLCurrency } from '@/utils/currency'
import styles from './ProductOrderCard.module.scss'

const ProductOrderCard = ({
  id,
  skuCode = '',
  name,
  price,
  mainImageUrl,
  href = null,
  quantity,
  freightPrice,
  deliveryDays
}) => {
  const handleChangeHref = () => {
    if (!href) return `${ROUTES.PRODUCT_PAGE}/${id}/${skuCode}`
    return href
  }

  return (
    <a href={handleChangeHref()}>
      <div className={styles.container}>
        {mainImageUrl && (
          <img
            className={styles.imageWrapper}
            src={`${mainImageUrl}`}
            alt={name}
          />
        )}
        <div className={styles.textWrapper}>
          <h2 className={styles.productName}>{quantity}x {name}</h2>
          <p className={styles.price}>{convertToBRLCurrency.format(price)}</p>
          <p className={styles.price}>{deliveryDays} dias uteis | {convertToBRLCurrency.format(freightPrice)}</p>
        </div>
      </div>
    </a>
  )
}

export default ProductOrderCard
