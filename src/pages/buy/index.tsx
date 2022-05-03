import { useRecoilValue } from 'recoil'
import ProductCard from '@/components/ProductCard/ProductCard'
import { productState } from '@/components/States/Atoms'
import style from './buy.module.scss'
import Input from '@/components/Input'
import Button from '@/components/Button'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const Buy = () => {
  const product = useRecoilValue(productState)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('nome é obrigatorio!'),
    surname: Yup.string().required('sobrenome é obrigatório!'),
    email: Yup.string().required('email é obrigatorio!').email('o email é invalido!'),
    telephone: Yup.string().required('telefone é obrigatorio!').matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/, 'numero inválido!'),
    cpf: Yup.string().required('cpf é obrigatorio!').matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido!'),
    cep: Yup.string().required('CEP é obrigatorio!').matches( /^[0-9]{5}-[0-9]{3}$/, 'CEP inválido!'),
    street: Yup.string().required('rua é obrigatorio!'),
    number: Yup.string().required('numero é obrigatorio!'),
    neighborhood: Yup.string().required('bairro é obrigatorio!'),
    complement: Yup.string().required('complemento é obrigatorio!'),
    city: Yup.string().required('cidade é obrigatorio!'),
    state: Yup.string().required('estado é obrigatorio!'),
  })

  const { register, handleSubmit, formState, control, setValue } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log('heyy, voce enviou')
    console.log(data);
    return false;
  }

  const cepValue = useWatch({ control, name: 'cep' })

  console.log(cepValue);

  const cepOnBlur = () => {
    fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setValue('street', data.logradouro)
        setValue('neighborhood', data.bairro)
        setValue('city', data.localidade)
        setValue('state', data.uf)
        setValue('complement', data.complemento)
      })
      .catch((err) => {
        console.log(err)
        alert('CEP inválido!')
      })
  }


  if(cepValue?.length === 8) {
    console.log('teste')
    cepOnBlur();
  }

  return (
    <>
      <h1>Buy.</h1>
      <h3>item a ser comprado.</h3>
      <ProductCard
        id={1}
        skuCode={product.skuCode}
        name={product.name}
        price={product.price?.listPrice}
        mainImageUrl={product.mainImageUrl}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputContainer}>
          <h3>Dados do usuário</h3>
          <Input register={register('name')} label="Nome" type="text" errorMessage={errors.name?.message} />
          <Input register={register('surname')} label="Sobrenome" type="text" errorMessage={errors.surname?.message} />
          <Input register={register('email')} label="E-mail" type="email" errorMessage={errors.email?.message} />
          <Input
            label="Telefone"
            type="tel"
            min={9}
            max={13}
            maxLength={13}
            errorMessage={errors.telephone?.message}
            register={register('telephone')}
          />
          <Input
            label="CPF"
            type="tel"
            min={11}
            max={11}
            maxLength={11}
            errorMessage={errors.cpf?.message}
            register={register('cpf')}
          />
        </div>
        <div className={style.inputContainer}>
          <h3>Dados da entrega</h3>
          <Input
            label="CEP"
            type="tel"
            min={8}
            max={8}
            maxLength={8}
            errorMessage={errors.cep?.message}
            onBlur={cepOnBlur}
            register={register('cep')}
          />
          <Input register={register('street')} label="Rua" type="text" errorMessage={errors.street?.message} />
          <Input register={register('number')} label="Número" type="text" errorMessage={errors.number?.message} />
          <Input register={register('neighborhood')} label="Bairro" type="text" errorMessage={errors.neighborhood?.message} />
          <Input register={register('complement')} label="Complemento" type="text" />
          <Input register={register('city')} label="Cidade" type="text" errorMessage={errors.city?.message} />
          <Input register={register('state')} maxLength={2} label="Estado" type="text" errorMessage={errors.state?.message} />
        </div>
        <div className={style.inputContainer}>
          <Button type="submit">Continuar</Button>
        </div>
      </form>
    </>
  )
}

export default Buy
