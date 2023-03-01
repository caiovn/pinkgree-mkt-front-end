import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useFetch from 'src/hooks/useFetch'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const EditProduct = () => {
  const router = useRouter()
  const { id } = router.query

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório!'),
    price: Yup.string().required('Preço é obrigatório!'),
    brand: Yup.string().required('Marca é obrigatório!'),
    category: Yup.string().required('Categoria é obrigatório!'),
    active: Yup.boolean(),
  })

  const { handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const { errors } = formState

  const { data: product, loading } = useFetch<IProduct>('GET', `product/${id}`)

  const onSubmit = () => {
    console.log('submitted!')
  }
  if (loading) return <Loading />

  return (
    <div>
      <span>
        <form onSubmit={handleSubmit(onSubmit)}>
          aquiiii: {id}, {JSON.stringify(product)}
        </form>
      </span>
    </div>
  )
}

export default EditProduct
