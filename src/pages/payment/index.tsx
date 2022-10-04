import { useRecoilValue, useSetRecoilState } from 'recoil'
import { formState as recoilFormState } from '@/components/States/Atoms'
import * as Yup from 'yup'
import { useEffect, useMemo, useState } from 'react'
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
import { User } from 'src/types'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'
import withAuth from 'src/hooks/withAuth'
import { BASE_URL } from '@/constants/api'

const Payment = () => {
  const router = useRouter()
  const stateForm = useRecoilValue(recoilFormState)
  const setFormState = useSetRecoilState(recoilFormState)
  const { productList } = stateForm.values
  const { address } = stateForm.values.shippingData

  const [user, setUser] = useState<User>()

  const { keycloak } = useKeycloak<KeycloakInstance>()

  useEffect(() => {
    if (keycloak?.authenticated) {
      const userData = keycloak?.tokenParsed
      setUser({
        customerId: userData.sub,
        name: userData.name,
        family_name: userData.family_name,
        given_name: userData.given_name,
        document: userData.document,
        email: userData.email,
        telephone: userData.phone,
      })
    }
  }, [keycloak?.authenticated])

  const formattedAddress = useMemo(
    () =>
      `${address.street} ${address.number} ${address.neighborhood} ${address.city}, ${address.state} ${address.zipcode} - ${address.country}`,
    [address]
  )

  const validationSchema = Yup.object().shape({
    paymentMethod: Yup.string()
      .required('Forma de pagamento é obrigatório!')
      .nullable(),
    cardNumber: Yup.string().when('paymentMethod', {
      is: 'BANK_SLIP',
      then: Yup.string(),
      otherwise: Yup.string().required('Numero do cartão é obrigatório!'),
      // .matches(/^4[0-9]{12}(?:[0-9]{3})?$/, 'cartão de credito inválido!'),
    }),
    titularName: Yup.string().when('paymentMethod', {
      is: 'BANK_SLIP',
      then: Yup.string(),
      otherwise: Yup.string().required('Nome do titular é obrigatório!'),
    }),
    expDate: Yup.string().when('paymentMethod', {
      is: 'BANK_SLIP',
      then: Yup.string(),
      otherwise: Yup.string().required('data de validade é obrigatório!'),
    }),
    cvv: Yup.string().when('paymentMethod', {
      is: 'BANK_SLIP',
      then: Yup.string(),
      otherwise: Yup.string().required('CVV é obrigatorio!'),
    }),
    cpf: Yup.string().when('paymentMethod', {
      is: 'BANK_SLIP',
      then: Yup.string(),
      otherwise: Yup.string()
        .required('cpf é obrigatorio!')
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido!'),
    }),
    differentAddress: Yup.boolean(),
    zipCode: Yup.string().when('differentAddress', {
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
  const zipCodeValue = useWatch({ control, name: 'zipCode' })
  const isDifferentAddress = useWatch({ control, name: 'differentAddress' })

  const zipCodeOnBlur = () => {
    fetch(`https://viacep.com.br/ws/${zipCodeValue}/json/`)
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
    if (/^[0-9]{5}-[0-9]{3}$/.test(zipCodeValue)) {
      zipCodeOnBlur()
    }
  }, [zipCodeValue])

  useEffect(() => {
    setValue('cardNumber', '')
    setValue('titularName', '')
    setValue('expDate', '')
    setValue('cvv', '')
  }, [paymentMethodValue])

  useEffect(() => {
    setValue('zipCode', '')
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
          paymentData: {
            ...oldFormState.values.paymentData,
            paymentMethod: data.paymentMethod,
            paymentMethodProperties: (() => {
              if (paymentMethodValue === 'BANK_SLIP')
                return {
                  document: user.document,
                  ownerName: user.name,
                  phone: user.telephone,
                  email: user.email,
                }

              return {
                cardNumber: data.cardNumber.replace(/\s/g, ''),
                cvv: data.cvv,
                validationDate: data.expDate,
                document: data.cpf,
                ownerName: data.titularName,
                birthday: '11/08/2002',
                phone: user.telephone,
                email: user.email,
              }
            })(),
            paymentAddress: {
              ...oldFormState.values.paymentData.paymentAddress,
              zipcode: isDifferentAddress
                ? data.zipCode
                : stateForm.values.shippingData.address.zipcode,
              street: isDifferentAddress
                ? data.street
                : stateForm.values.shippingData.address.street,
              number: isDifferentAddress
                ? data.number
                : stateForm.values.shippingData.address.number,
              neighborhood: isDifferentAddress
                ? data.neighborhood
                : stateForm.values.shippingData.address.neighborhood,
              complement: isDifferentAddress
                ? data.complement
                : stateForm.values.shippingData.address.complement,
              city: isDifferentAddress
                ? data.city
                : stateForm.values.shippingData.address.city,
              state: isDifferentAddress
                ? data.state
                : stateForm.values.shippingData.address.state,
              phone: user.telephone,
            },
          },
        },
      }
    })

    console.log(JSON.stringify(stateForm.values))

    fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keycloak.token}`,
      },
      body: JSON.stringify(stateForm.values),
    }).then((response) => {
      response.json()
    })

    return false
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Endereço:</h2>
          {user && <span>{user.name}</span>}
          <br />
          <span>{formattedAddress}</span>
          <span></span>
        </div>
        <div>
          <div className={style.radioButtonGroup}>
            <h2>Forma de pagamento:</h2>
            <RadioGroup
              options={[
                { label: 'Cartão de crédito', value: 'CREDIT_CARD' },
                { label: 'Cartão de débito', value: 'DEBIT_CARD' },
                { label: 'Boleto', value: 'BANK_SLIP' },
              ]}
              register={register('paymentMethod')}
              errorMessage={errors.paymentMethod?.message}
            />
          </div>
          {(paymentMethodValue === 'CREDIT_CARD' ||
            paymentMethodValue === 'DEBIT_CARD') && (
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
              <InputMask
                mask="monthYear"
                register={register('expDate')}
                label="Data de validade"
                type="tel"
                errorMessage={errors.expDate?.message}
              />
              <InputMask
                register={register('cvv')}
                mask="cvv"
                label="CVV"
                type="tel"
                errorMessage={errors.cvv?.message}
              />
              <InputMask
                register={register('cpf')}
                mask="cpf"
                label="CPF"
                type="tel"
                errorMessage={errors.cpf?.message}
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
                mask="zipCode"
                label="CEP"
                type="tel"
                errorMessage={errors.zipCode?.message}
                register={register('zipCode')}
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
            skuCode={productList[0].skuCode}
            name={productList[0].name}
            price={productList[0].price?.listPrice}
            mainImageUrl={productList[0].image}
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

export default withAuth(Payment)
