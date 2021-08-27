import { useRouter } from "next/router";
import useFetch from "../../hooks/useFetch";
import { convertToBRLCurrency } from "@/utils/currency";
import { Carousel } from '@/components/index';
import styles from './product.module.scss';

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: product, loading } = useFetch<ISku[]>('GET', `sku/product_skus/${id}`);

  if (loading) return <span>loading...</span>;

  console.log(product)

  return (
    <div>
      <div>
        <Carousel settings={{ dots: true, slidesToScroll: 1, slidesToShow: 1, arrows: false }}>
          <div className={styles.imageContainer}>
            <img src={product[0].mainImageUrl} alt={product[0].name} />
          </div>
          {product[0].urlImages.map((image) => (
            <div className={styles.imageContainer}>
              <img src={image} alt="ooo" />
            </div>
          ))}
        </Carousel>
      </div>
      <h2>{product[0].name}</h2>
      <p className={styles.price}>{convertToBRLCurrency.format(product[0].price.listPrice)}</p>
    </div>
  );
}

export default ProductPage;
