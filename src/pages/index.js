import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  const session = useSession()
  const router = useRouter()

  console.log('session', session.status)

  useEffect(() => {
    if (session?.user && router.route === '/') {
      router.replace('/dashboards/analytics')
    }
  }, [session?.user, router])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
