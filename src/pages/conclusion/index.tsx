import { useRecoilValue } from 'recoil'

import styles from './Conclusion.module.scss'

import ProductCard from '@/components/ProductCard/ProductCard'
import { formState as recoilFormState } from '@/components/States/Atoms'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import ROUTES from '@/routes/routes'
import { useEffect } from 'react'
import withAuth from 'src/hooks/withAuth'

const Conclusion = () => {
  const router = useRouter()
  const stateForm = useRecoilValue(recoilFormState)
  const { productList } = stateForm.values

  useEffect(() => {
    if (stateForm.step != 2) router.push(ROUTES.HOME)
  }, []);

  return (
    <div>
      <div className={styles.titleWrapper}>
        <i className="fa-solid fa-circle-check"></i>
        <h1>Compra feita com sucesso.</h1>
        <span>Após a confirmação do pagamento, o seu pedido será enviado.</span>
      </div>

      <div>
        <ProductCard
          id={1}
          skuCode={productList[0].skuCode}
          name={productList[0].name}
          price={productList[0].price?.listPrice}
          mainImageUrl={productList[0].image}
        />

        <div>
          <Button
            onClick={() => {
              router.push(ROUTES.ORDERS)
            }}
          >
            Ir para meus pedidos.
          </Button>
          <Button
            onClick={() => {
              router.push(ROUTES.HOME)
            }}
          >
            Ir para home.
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Conclusion) 
