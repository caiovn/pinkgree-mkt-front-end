import { useRouter } from 'next/router'
import withAuth from 'src/hooks/withAuth'

const Orders = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <span>order {id} works!</span>
    </>
  )
}

export default withAuth(Orders)
