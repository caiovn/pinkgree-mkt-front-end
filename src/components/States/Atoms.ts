import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Billing, Client } from 'src/types'

const { persistAtom } = recoilPersist()

const productState = atom({
  key: 'productState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

const formState = atom<{step?: number, values: {shipment: Client, billing: Billing}}>({
  key: 'formState',
  default: {
    step: null,
    values: {
      shipment: {
        name: '',
        surname: '',
        cpf: '',
        email: '',
        telephone: '',
        address: {
          cep: '',
          street: '',
          number: '',
          neighborhood: '',
          complement: '',
          city: '',
          state: '',
        },
      },
      billing: {
        name: '',
        surname: '',
        cpf: '',
        email: '',
        telephone: '',
        address: {
          cep: '',
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

export { productState, formState }
