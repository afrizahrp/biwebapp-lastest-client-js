import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'authenticated' && router.route === '/') {
      router.replace('/dashboards/analytics')
    }
  }, [router.route, session.status])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
