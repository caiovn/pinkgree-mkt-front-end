import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ProductCard from '@/components/ProductCard/ProductCard'
import { formState as recoilFormState } from '@/components/States/Atoms'
import style from './buy.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import InputMask from '@/components/InputMask'
import { useRouter } from 'next/router'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import withAuth from 'src/hooks/withAuth'
import { User } from 'src/types'
import ROUTES from '@/routes/routes'

const Buy = () => {
  const router = useRouter()
  const setFormState = useSetRecoilState(recoilFormState)
  const stateForm = useRecoilValue(recoilFormState)

  const [user, setUser] = useState<User>()

  const { keycloak } = useKeycloak<KeycloakInstance>()

  useEffect(() => {
    if (stateForm.step != 0) router.push(ROUTES.HOME)
  }, []);

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

  const { productList } = stateForm.values

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    surname: Yup.string(),
    email: Yup.string().email('o email é invalido!'),
    telephone: Yup.string(),
    cpf: Yup.string(),
    zipCode: Yup.string()
      .required('CEP é obrigatorio!')
      .matches(/^[0-9]{5}-[0-9]{3}$/, 'CEP inválido!'),
    street: Yup.string().required('rua é obrigatorio!'),
    number: Yup.string().required('numero é obrigatorio!'),
    neighborhood: Yup.string().required('bairro é obrigatorio!'),
    complement: Yup.string(),
    city: Yup.string().required('cidade é obrigatorio!'),
    state: Yup.string().required('estado é obrigatorio!'),
  })

  const { register, handleSubmit, formState, control, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const zipCodeValue = useWatch({ control, name: 'zipCode' })

  const { errors } = formState

  useEffect(() => {
    if (!productList[0]) router.push('/')
    if (stateForm.values?.shippingData) {
      const { shippingData } = stateForm.values
      setValue('zipCode', shippingData.address.zipcode)
      setValue('city', shippingData.address.city)
      setValue('complement', shippingData.address.complement)
      setValue('neighborhood', shippingData.address.neighborhood)
      setValue('number', shippingData.address.number)
      setValue('state', shippingData.address.state)
      setValue('street', shippingData.address.street)
    }
  }, [])

  useEffect(() => {
    if (user) {
      setValue('name', user.given_name)
      setValue('email', user.email)
      setValue('surname', user.family_name)
      setValue('cpf', user.document)
      setValue('telephone', user.telephone)
    }
  }, [user])

  const onSubmit = (data) => {
    setFormState((oldFormState) => {
      return {
        ...oldFormState,
        step: 1,
        values: {
          ...oldFormState.values,
          customerId: user.customerId,
          shippingData: {
            ...oldFormState.values.shippingData,
            address: {
              ...oldFormState.values.shippingData.address,
              city: data.city,
              complement: data.complement,
              neighborhood: data.neighborhood,
              number: data.number,
              phone: data.telephone,
              state: data.state,
              street: data.street,
              zipcode: data.zipCode,
            },
          },
        },
      }
    })

    router.push(ROUTES.PAYMENT)

    return false
  }

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

  if (!productList[0]) return

  return (
    <div>
      <h1>Buy.</h1>
      <h3>item a ser comprado.</h3>
      <ProductCard
        id={1}
        skuCode={productList[0].skuCode}
        name={productList[0].name}
        price={productList[0].price?.listPrice}
        mainImageUrl={productList[0].image}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputContainer}>
          <h3>Dados do usuário</h3>
          <Input
            register={register('name')}
            label="Nome"
            type="text"
            errorMessage={errors.name?.message}
            disabled={true}
          />
          <Input
            register={register('surname')}
            label="Sobrenome"
            type="text"
            errorMessage={errors.surname?.message}
            disabled={true}
          />
          <Input
            register={register('email')}
            label="E-mail"
            type="email"
            errorMessage={errors.email?.message}
            disabled={true}
          />
          <Input
            label="Telefone"
            type="tel"
            errorMessage={errors.telephone?.message}
            register={register('telephone')}
            disabled={true}
          />
          <Input
            label="CPF"
            type="tel"
            errorMessage={errors.cpf?.message}
            register={register('cpf')}
            disabled={true}
          />
        </div>
        <div className={style.inputContainer}>
          <h3>Dados da entrega</h3>
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
        <div className={style.inputContainer}>
          <Button type="submit">Continuar</Button>
        </div>
      </form>
    </div>
  )
}

export default withAuth(Buy)
