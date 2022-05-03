import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const productState = atom({
  key: 'productState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const formState = atom({
  key: 'formState',
  default: {
    step: null,
    values: {

    }
  },
  effects_UNSTABLE: [persistAtom],
});

export { productState ,formState }
