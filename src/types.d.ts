type IBrand = {
  id: number
  name: string
  brandImage?: string
}

interface ICategory extends IBrand {
  image: string
}

interface IRating {
  average: number,
  count: number,
  data: {
    id: number
    orderId: number
    customer: {
      id: string
      name: string
      lastname: string
    }
    skuCode: string
    stars: number
    title: string
    evaluation: string
    createdAt: string
  }[]
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
  product: IProduct
  price: {
    listPrice: number
    salePrice?: number
    startDate?: Date
    endDate?: Date
  }
  skuAttributes: Array<{ label: string; type: string; value: string }>
}

interface User {
  customerId: string
  name: string
  given_name: string
  family_name: string
  email: string
  document: string
  telephone: string
}

type Client = {
  name: string
  surname: string
  cpf: string
  email: string
  telephone: string
  address: Address
}

type Address = {
  country: string
  zipcode: string
  street: string
  number: string
  neighborhood: string
  complement: string
  city: string
  state: string
  phone: string
}

type Billing = {
  paymentMethod: string
  creditCard: {
    name: string
    number: string
    cvv: string
    expDate: string
  }
  address: Address
}

type CustomerData = {
  id: string
  document: string
  name: string
  lastName: string
  email: string
  phone: string
}

type ShippingData = {
  freightPrice: number
  deliveryDays: number
  address: Address
}

type ProductList = {
  name: string
  price: {
    listPrice: number
    salePrice: number
    startDate: string
    endDate: string
  }
  stockQuantity: number
  skuCode: string
  quantity: number
  image: string
}

type PaymentData = {
  paymentMethod: string
  paymentMethodProperties: {
    cardNumber?: string
    cvv?: string
    validationDate?: string
    document: string
    ownerName: string
    birthday?: string
    phone: string
    email: string
  }
  paymentAddress: Address
}

type Mask =
  | 'cpf'
  | 'zipCode'
  | 'telephone'
  | 'credit_card'
  | 'cvv'
  | 'monthYear'

enum OrderStatus {
  ORDER_CANCELED,
  ORDER_SHIPPED,
  ORDER_EN_ROUTE,
  ORDER_IN_SEPARATION,
  ORDER_STOCK_FAILED,
  ORDER_STOCK_RESERVED,
  PAYMENT_CONFIRMED,
  ORDER_CREATED,
}

type Order = {
  id: String
  status: OrderStatus
  customerData: CustomerData
  shippingData: ShippingData
  productList: Array<ISku>
  paymentData: {
    amount: number
    paymentMethod: string
    paymentAddress: Address
  }
  createdAt: Instant
  updatedAt: Instant
}
