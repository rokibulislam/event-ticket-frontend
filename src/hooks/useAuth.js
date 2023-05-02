import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import httpService from '@/services/httpService'

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await httpService.get('/auth/me')
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log('Error fetching user', error)
        setLoading(false)
        router.push('/auth/login')
      }
    }

    fetchUser()
  }, [router])

  return { user, loading }
}