import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'


export const protectRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter()
    const { user, loading } = useAuth()
    if (loading) return <p>Loading...</p>
    if (!user) {
      router.push('/auth/login')
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
