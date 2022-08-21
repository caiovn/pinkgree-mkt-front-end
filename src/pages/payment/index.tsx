import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  productState,
  formState as recoilFormState,
} from '@/components/States/Atoms'
import * as Yup from 'yup'
import { useMemo } from 'react'

const Payment = () => {
  const stateForm = useRecoilValue(recoilFormState)
  const product = useRecoilValue(productState)
  const { address } = stateForm.values.shipment;
  const formattedAddress = useMemo(() => `${address.street} ${address.number} ${address.neighborhood} ${address.city}, ${address.state} ${address.cep}`, [address]);

  console.log(stateForm);
  if(stateForm.step != 1) return <h1>NN PODE SER ADM</h1>;

  return (
    <div>
      <div>
        <h2>Endereço:</h2>
        <span>{stateForm.values.shipment.name} {stateForm.values.shipment.surname}</span>
        <br />
        <span>{formattedAddress}</span>
        <span></span>
      </div>
      <div>
        <h2>Dados de pagamento:</h2>
      </div>
      <div>
        <h2>Resumo do pedido:</h2>
      </div>
    </div>
  )
}

export default Payment;
