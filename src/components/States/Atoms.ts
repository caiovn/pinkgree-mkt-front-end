import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Billing, Client, IProduct } from 'src/types'

const { persistAtom } = recoilPersist()

export interface IFormState {
  step?: number
  values: { product: IProduct; shipment: Client; billing: Billing }
}

const formState = atom<IFormState>({
  key: 'formState',
  default: {
    step: null,
    values: {
      product: {
        active: true,
        brand: {
          id: null,
          name: '',
        },
        categories: [],
        id: null,
        skuCode: '',
        mainImageUrl: '',
        name: '',
        price: null,
      },
      shipment: {
        name: '',
        surname: '',
        cpf: '',
        email: '',
        telephone: '',
        address: {
          zipCode: '',
          street: '',
          number: '',
          neighborhood: '',
          complement: '',
          city: '',
          state: '',
        },
      },
      billing: {
        address: {
          zipCode: '',
          street: '',
          number: '',
          neighborhood: '',
          complement: '',
          city: '',
          state: '',
        },
        paymentMethod: '',
        creditCard: {
          name: '',
          number: '',
          cvv: '',
          expDate: '',
        },
      },
    },
  },
  effects_UNSTABLE: [persistAtom],
})

export { formState }
