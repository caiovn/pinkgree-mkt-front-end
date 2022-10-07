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
    customerId: string
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
      customerId: '',
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
          zipcode: '',
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
          zipcode: '',
          complement: '',
          phone: '',
        },
      },
    },
  },
  effects_UNSTABLE: [persistAtom],
})

export { formState }
