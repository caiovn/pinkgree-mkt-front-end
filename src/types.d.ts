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
  country: string,
  zipCode: string,
  street: string,
  number: string,
  neighborhood: string,
  complement: string,
  city: string,
  state: string,
  phone: string,
}

type Billing = {
  paymentMethod: string,
  creditCard: {
    name: string,
    number: string,
    cvv: string,
    expDate: string,
  },
  address: Address
}

type CustomerData = {
  id: string,
  document: string,
  name: string,
  lastName: string,
  email: string,
  phone: string,
}

type ShippingData = {
  freightPrice: number,
  deliveryDays: number,
  address: Address,
}

type ProductList = [
  {
    name: string,
    price: {
      listPrice: number,
      salePrice: number,
      startDate: string,
      endDate: string,
    }
    stockQuantity: number,
    skuCode: string,
    quantity: number,
    image: string,
  },
]

type PaymentData = {
  paymentMethod: string,
  paymentMethodProperties: {
    cardNumber?: string,
    cvv?: string,
    validationDate?: string,
    document: string,
    ownerName: string,
    birthday?: string,
    phone: string,
    email: string,
  }
  paymentAddress: Address,
}

type Mask = 'cpf' | 'zipCode' | 'telephone' | 'credit_card' | 'cvv'
