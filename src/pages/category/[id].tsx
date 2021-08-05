import { useRouter } from "next/router";
import useFetch from 'src/hooks/useFetch';
import ProductCard from '@/components/ProductCard/ProductCard';

const Category = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: products }= useFetch<IProducts[]>('GET', `product/category/${id}`);

  return (
    <>
      {
        products && products.map((product) => {
          return (
            <ProductCard key={product.id} {...product} />
          );
        })
      }
    </>
  );
};

export default Category;
