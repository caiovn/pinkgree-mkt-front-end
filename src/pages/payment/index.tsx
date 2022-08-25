import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  productState,
  formState as recoilFormState,
} from '@/components/States/Atoms'
import * as Yup from 'yup'
import { useEffect, useMemo } from 'react'
import ProductCard from '@/components/ProductCard/ProductCard'
import Button from '@/components/Button'
import InputMask from '@/components/InputMask'
import Input from '@/components/Input'
import { useRouter } from 'next/router'
import RadioButton from '@/components/RadioButton'
import style from "./payment.module.scss"

const Payment = () => {
  const router = useRouter();
  const stateForm = useRecoilValue(recoilFormState)
  const setFormState = useSetRecoilState(recoilFormState)
  const product = useRecoilValue(productState)
  const { address } = stateForm.values.shipment;
  const formattedAddress = useMemo(() => `${address.street} ${address.number} ${address.neighborhood} ${address.city}, ${address.state} ${address.cep}`, [address]);

  console.log(stateForm);

  useEffect(() => {
    if(stateForm.step === 0) router.push('/buy')
  }, [stateForm]);

  const handleBack = () => {
    setFormState((oldFormState) => {
      return {
        ...oldFormState,
        step: 0,
        values: {
          ...oldFormState.values,
        },
      }

    })
  }

  return (
    <div>
      <div>
        <h2>Endereço:</h2>
        <span>{stateForm.values.shipment.name} {stateForm.values.shipment.surname}</span>
        <br />
        <span>{formattedAddress}</span>
        <span></span>
      </div>
      <div>
        <h2>Forma de pagamento:</h2>
        <div className={style.radioButtonGroup}>
          <RadioButton label="Cartão de crédito" name="paymentForm" />
          <RadioButton label="Boleto" name="paymentForm" />
          <RadioButton label="Pix" name="paymentForm" />
        </div>
        <h2>Dados do cartão de crédito:</h2>
        <InputMask
          mask="credit_card"
          label="Numero do cartão"
          type="tel"
          // register={register('cpf')}
        />
        <Input
          // register={register('name')}
          label="Data de validade"
          type="date"
          // errorMessage={errors.name?.message}
        />
        <InputMask
          // register={register('name')}
          mask="cvv"
          label="CVV"
          type="tel"
          // errorMessage={errors.name?.message}
        />
      </div>
      <div>
        <h2>Resumo do pedido:</h2>
        <span style={{'fontSize': '16px'}}>Entrega estimada: 3 dias</span>
        <ProductCard
          id={1}
          skuCode={product.skuCode}
          name={product.name}
          price={product.price?.listPrice}
          mainImageUrl={product.mainImageUrl}
        />
      </div>
      <div>
        <Button onClick={() => handleBack()}>Voltar</Button>
        <Button color='green' type="submit">Concluir compra</Button>
      </div>
    </div>
  )
}

export default Payment;
