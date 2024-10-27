'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoginForm } from '@/components/login-form'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (userId) {
      router.replace('/dashboard')
    }
  }, [router])

  return <LoginForm />
}
