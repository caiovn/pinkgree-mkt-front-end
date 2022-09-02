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
    cardNumber: Yup.string().when('paymentMethod', {
      is: 'boleto',
      then: Yup.string(),
      otherwise: Yup.string().required('Numero do cartão é obrigatório!'),
      // .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, 'cartão de credito inválido!'),
    }),
    titularName: Yup.string().when('paymentMethod', {
      is: 'boleto',
      then: Yup.string(),
      otherwise: Yup.string().required('Nome do titular é obrigatório!'),
    }),
    expDate: Yup.string().when('paymentMethod', {
      is: 'boleto',
      then: Yup.string(),
      otherwise: Yup.string().required('data de validade é obrigatório!'),
    }),
    cvv: Yup.string().when('paymentMethod', {
      is: 'boleto',
      then: Yup.string(),
      otherwise: Yup.string().required('CVV é obrigatorio!'),
    }),
    differentAddress: Yup.boolean(),
    cep: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string()
        .required('CEP é obrigatorio!')
        .matches(/^[0-9]{5}-[0-9]{3}$/, 'CEP inválido!'),
      otherwise: Yup.string(),
    }),
    street: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string().required('rua é obrigatorio!'),
      otherwise: Yup.string(),
    }),
    number: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string().required('numero é obrigatorio!'),
      otherwise: Yup.string(),
    }),
    neighborhood: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string().required('bairro é obrigatorio!'),
      otherwise: Yup.string(),
    }),
    complement: Yup.string(),
    city: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string().required('cidade é obrigatorio!'),
      otherwise: Yup.string(),
    }),
    state: Yup.string().when('differentAddress', {
      is: true,
      then: Yup.string().required('estado é obrigatorio!'),
      otherwise: Yup.string(),
    }),
  })

  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const { errors } = formState

  const paymentMethodValue = useWatch({ control, name: 'paymentMethod' })
  const cepValue = useWatch({ control, name: 'cep' })
  const isDifferentAddress = useWatch({ control, name: 'differentAddress' })

  const cepOnBlur = () => {
    fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
      .then((resp) => resp.json())
      .then((data) => {
        setValue('street', data.logradouro, { shouldValidate: true })
        setValue('neighborhood', data.bairro, { shouldValidate: true })
        setValue('city', data.localidade, { shouldValidate: true })
        setValue('state', data.uf, { shouldValidate: true })
        setValue('complement', data.complemento, { shouldValidate: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (/^[0-9]{5}-[0-9]{3}$/.test(cepValue)) {
      cepOnBlur()
    }
  }, [cepValue])

  useEffect(() => {
    setValue('cardNumber', '')
    setValue('titularName', '')
    setValue('expDate', '')
    setValue('cvv', '')
  }, [paymentMethodValue])

  useEffect(() => {
    setValue('cep', '')
    setValue('street', '')
    setValue('number', '')
    setValue('neighborhood', '')
    setValue('complement', '')
    setValue('city', '')
    setValue('state', '')
  }, [isDifferentAddress])

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
    setFormState((oldFormState) => {
      return {
        ...oldFormState,
        step: 2,
        values: {
          ...oldFormState.values,
          billing: {
            ...oldFormState.values.billing,
            paymentMethod: data.paymentMethod,
            creditCard: {
              ...oldFormState.values.billing.creditCard,
              name: data.titularName,
              number: data.cardNumber,
              cvv: data.cvv,
              expDate: data.expDate,
            },
            address: {
              ...oldFormState.values.billing.address,
              cep: data.cep,
              street: data.street,
              number: data.number,
              neighborhood: data.neighborhood,
              complement: data.complement,
              city: data.city,
              state: data.state,
            },
          },
        },
      }
    })

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
              <h2>Dados do cartão:</h2>
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
                register={register('expDate')}
                label="Data de validade"
                type="date"
                errorMessage={errors.expDate?.message}
              />
              <InputMask
                register={register('cvv')}
                mask="cvv"
                label="CVV"
                type="tel"
                errorMessage={errors.cvv?.message}
              />
            </div>
          )}
          {paymentMethodValue === 'boleto' && (
            <div className={style.boletoWrapper}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>
                Vencimento em 3 dias. A data de entrega será alterada devido ao
                tempo de compensação do boleto.
              </p>
            </div>
          )}
        </div>
        <div className={style.addressWrapper}>
          <Checkbox
            label="Endereco de cobranca é diferente do endereco de entrega"
            register={register('differentAddress')}
          />
          {isDifferentAddress && (
            <div>
              <h3>Endereço de cobrança:</h3>
              <InputMask
                mask="cep"
                label="CEP"
                type="tel"
                errorMessage={errors.cep?.message}
                register={register('cep')}
              />
              <Input
                register={register('street')}
                label="Rua"
                type="text"
                errorMessage={errors.street?.message}
              />
              <Input
                register={register('number')}
                label="Número"
                type="text"
                errorMessage={errors.number?.message}
              />
              <Input
                register={register('neighborhood')}
                label="Bairro"
                type="text"
                errorMessage={errors.neighborhood?.message}
              />
              <Input
                register={register('complement')}
                label="Complemento"
                type="text"
              />
              <Input
                register={register('city')}
                label="Cidade"
                type="text"
                errorMessage={errors.city?.message}
              />
              <Input
                register={register('state')}
                maxLength={2}
                label="Estado"
                type="text"
                errorMessage={errors.state?.message}
              />
            </div>
          )}
        </div>
        <div>
          <h2>Resumo do pedido:</h2>
          <span style={{ fontSize: '16px' }}>
            Entrega estimada: 3 dias após a confirmação do pagamento
          </span>
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
