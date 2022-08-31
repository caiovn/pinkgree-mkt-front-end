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
import style from './payment.module.scss'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RadioGroup from '@/components/RadioGroup'
import Checkbox from '@/components/Checkbox'

const Payment = () => {
  const router = useRouter()
  const stateForm = useRecoilValue(recoilFormState)
  const setFormState = useSetRecoilState(recoilFormState)
  const product = useRecoilValue(productState)
  const { address } = stateForm.values.shipment
  const formattedAddress = useMemo(
    () =>
      `${address.street} ${address.number} ${address.neighborhood} ${address.city}, ${address.state} ${address.cep}`,
    [address]
  )

  const validationSchema = Yup.object().shape({
    paymentMethod: Yup.string().required('Forma de pagamento é obrigatório!'),
    cardNumber: Yup.string()
      .required('Numero do cartão é obrigatório!')
      .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, 'cartão de credito inválido!'),
    titularName: Yup.string().required('Nome do titular é obrigatório!'),
    validDate: Yup.string().required('data de validade é obrigatório!'),
    cvv: Yup.string().required('CVV é obrigatorio!'),
    sameAdress: Yup.bool(),
  })

  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const { errors } = formState

  const paymentMethodValue = useWatch({ control, name: 'paymentMethod' })

  console.log(paymentMethodValue)
  console.log(formState.errors)

  useEffect(() => {
    if (stateForm.step === 0) router.push('/buy')
  }, [stateForm])

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

  const onSubmit = (data) => {
    return false
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Endereço:</h2>
          <span>
            {stateForm.values.shipment.name} {stateForm.values.shipment.surname}
          </span>
          <br />
          <span>{formattedAddress}</span>
          <span></span>
        </div>
        <div>
          <div className={style.radioButtonGroup}>
            <h2>Forma de pagamento:</h2>
            <RadioGroup
              options={[
                { label: 'Cartão de crédito', value: 'credit_card' },
                { label: 'Cartão de débito', value: 'debit_card' },
                { label: 'Boleto', value: 'boleto' },
              ]}
              register={register('paymentMethod')}
              errorMessage={errors.paymentMethod?.message}
            />
          </div>
          {(paymentMethodValue === 'credit_card' ||
            paymentMethodValue === 'debit_card') && (
            <div className="card-fields">
              <h2>Dados do cartão de crédito:</h2>
              <InputMask
                register={register('cardNumber')}
                mask="credit_card"
                label="Numero do cartão"
                type="tel"
                errorMessage={errors.cardNumber?.message}
              />
              <Input
                register={register('titularName')}
                label="Nome do titular"
                type="text"
                errorMessage={errors.titularName?.message}
              />
              <Input
                register={register('validDate')}
                label="Data de validade"
                type="date"
                errorMessage={errors.validDate?.message}
              />
              <InputMask
                register={register('cvv')}
                mask="cvv"
                label="CVV"
                type="tel"
                errorMessage={errors.cvv?.message}
              />
              <div>
                <Checkbox
                  label="Endereco de cobranca é o mesmo do endereco de entrega"
                  register={register('sameAdress')}
                />
              </div>
            </div>
          )}
          {paymentMethodValue === 'boleto' && (
            <div className={style.boletoWrapper}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>Vencimento em 3 dias. A data de entrega será alterada devido ao tempo de compensação do boleto.</p>
            </div>
          )}
        </div>
        <div>
          <h2>Resumo do pedido:</h2>
          <span style={{ fontSize: '16px' }}>Entrega estimada: 3 dias após a confirmação do pagamento</span>
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
          <Button color="green" type="submit">
            Finalizar compra
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Payment
