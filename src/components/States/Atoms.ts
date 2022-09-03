import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import {
  CustomerData,
  PaymentData,
  ProductList,
  ShippingData,
} from 'src/types'

const { persistAtom } = recoilPersist()

export interface IFormState {
  step?: number
  values: {
    customerData: CustomerData
    shippingData: ShippingData
    productList: ProductList
    paymentData: PaymentData
  }
}

const formState = atom<IFormState>({
  key: 'formState',
  default: {
    step: null,
    values: {
      customerData: {
        id: '6034f9a9-6337-40ca-8bac-cf92cc597799',
        document: '',
        name: '',
        lastName: '',
        email: '',
        phone: '',
      },
      shippingData: {
        freightPrice: 9.9,
        deliveryDays: 3,
        address: {
          country: 'Brasil',
          state: '',
          city: '',
          neighborhood: '',
          street: '',
          number: '',
          zipCode: '',
          complement: '',
          phone: '',
        },
      },
      productList: [
        {
          name: '',
          price: {
            listPrice: null,
            salePrice: null,
            startDate: '',
            endDate: '',
          },
          stockQuantity: null,
          skuCode: '',
          quantity: 1,
          image: '',
        },
      ],
      paymentData: {
        paymentMethod: '',
        paymentMethodProperties: {
          cardNumber: '',
          cvv: '',
          validationDate: '',
          document: '',
          ownerName: '',
          birthday: '',
          phone: '',
          email: '',
        },
        paymentAddress: {
          country: 'Brasil',
          state: '',
          city: '',
          neighborhood: '',
          street: '',
          number: '',
          zipCode: '',
          complement: '',
          phone: '',
        },
      },
    },
  },
  effects_UNSTABLE: [persistAtom],
})

export { formState }
