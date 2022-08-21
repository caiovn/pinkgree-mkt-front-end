import { type } from "os"

type IBrand = {
  id: number
  name: string
}

interface ICategory extends IBrand {
  image: string
}

interface IProduct {
  active?: boolean
  brand?: IBrand
  categories?: Array<ICategory>
  id: number
  skuCode?: string
  mainImageUrl: string
  name: string
  price: number
}

interface ISku {
  skuCode: string
  name: string
  stockQuantity: number
  height: number
  width: number
  length: number
  relatedSkus: Array<IProduct>
  weight: number
  mainImageUrl: string
  urlImages: Array<string>
  price: {
    listPrice: number
    salePrice?: number
    startDate?: Date
    endDate?: Date
  }
  skuAttributes: Array<{ label: string; type: string; value: string }>
}

type Client = {
  name: string,
  surname: string,
  cpf: string,
  email: string,
  telephone: string,
  address: Address
}

type Address = {
  cep: string,
  street: string,
  number: string,
  neighborhood: string,
  complement: string,
  city: string,
  state: string,
}

type Billing = {
  paymentMethod: string,
  creditCard: {
    name: string,
    number: string,
    cvv: string,
    expDate: string,
  }
} & Client
